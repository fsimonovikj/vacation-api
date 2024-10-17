import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "./entities/company.entity";
import { Like, Repository } from "typeorm";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { UserService } from "../users/user.service";

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly userService: UserService
  ) {}

  async findAll() {
    const companies = await this.companyRepository.find({
      relations: ["managers"],
    });

    return companies.map((company) => ({
      ...company,
      managerEmails: company.managers.map((manager) => manager.email),
    }));
  }

  async checkExistByName(name: string) {
    const exist = await this.companyRepository.findOne({
      where: {
        name,
      },
    });

    if (exist) {
      throw new ConflictException("Company with same name already exists.");
    }
  }

  async create(createCompanyDto: CreateCompanyDto) {
    await this.checkExistByName(createCompanyDto.name);

    const company = await this.companyRepository.create({
      name: createCompanyDto.name,
      isActivated: createCompanyDto.isActivated,
      notes: createCompanyDto.notes,
      domains: createCompanyDto.domains,
    });

    return await this.companyRepository.save(company);
  }

  async findCompanyByDomain(domain: string) {
    const coompany = await this.companyRepository.findOne({
      where: {
        domains: Like(`${domain}`),
      },
    });

    if (!coompany) {
      throw new NotFoundException("Not found company");
    }

    return coompany;
  }

  async findOne(id: string) {
    const company = await this.companyRepository.findOne({
      where: {
        id,
      },
      relations: ["managers"],
    });

    return {
      ...company,
      managerEmails: company.managers.map((manager) => manager.email),
    };
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    let company = await this.findOne(id);

    if (updateCompanyDto.name && company.name !== updateCompanyDto.name)
      await this.checkExistByName(updateCompanyDto.name);

    company = {
      ...company,
      ...updateCompanyDto,
    };

    return await this.companyRepository.save(company);
  }

  //   TODO: create user entity
  async changeActiveStatus(companyId: string, user: any) {
    const checkUser = await this.userService.findUser(user.id);

    if (!checkUser) {
      throw new NotFoundException("User not exist");
    }

    await this.checkCompanyExists(companyId);

    const company = await this.findOne(companyId);
    company.isActivated = !company.isActivated;

    return await this.companyRepository.save(company);
  }

  async checkCompanyExists(companyId: string) {
    const exists = await this.companyRepository.exist({
      where: { id: companyId },
    });

    if (!exists) throw new NotFoundException("Company not found");
  }
}
