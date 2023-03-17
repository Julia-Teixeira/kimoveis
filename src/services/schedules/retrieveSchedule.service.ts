import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { AppError } from "../../errors";
import { iRealEstateRepo } from "../../interfaces/realEstate.interfaces";

const retrieveSchedule = async (idRealEstate: number): Promise<RealEstate> => {
  const realEstateRepo: iRealEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate | null = await realEstateRepo.findOne({
    where: { id: idRealEstate },
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const schedulesRealEstate = await realEstateRepo
    .createQueryBuilder("real_estate")
    .select([
      "real_estate",
      "address",
      "category",
      "schedule_realEstates",
      "user",
    ])
    .innerJoin("real_estate.address", "address")
    .innerJoin("real_estate.category", "category")
    .innerJoin("real_estate.schedules", "schedule_realEstates")
    .innerJoin("schedule_realEstates.user", "user")
    .where("real_estate.id = :id", { id: idRealEstate })
    .getOne();

  return schedulesRealEstate!;
};

export default retrieveSchedule;
