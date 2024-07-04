import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookingDay } from "./entities/booking-day.entity";
import { Not, Repository } from "typeorm";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { BookingStatus } from "./entities/booking-status.enum";

@Injectable()
export class BookingDaysService {
  constructor(
    @InjectRepository(BookingDay)
    private readonly bookingRepository: Repository<BookingDay>
  ) {}

  async findAll(): Promise<BookingDay[]> {
    return this.bookingRepository.find({
      where: {
        status: Not(BookingStatus.Pending),
      },
      // order: { createdAt: "DESC" },
    });
  }

  async findOne(id: any): Promise<BookingDay> {
    return this.bookingRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(createBookingDto: CreateBookingDto) {
    const vacation = await this.bookingRepository.create({
      id: createBookingDto.id,
      title: createBookingDto.title,
      description: createBookingDto.description,
      start: createBookingDto.start,
      end: createBookingDto.end,
      bookedDays: createBookingDto.bookedDays,
      status: createBookingDto.status,
      userId: createBookingDto.userId,
    });

    const savedVacation = await this.bookingRepository.save(vacation);
    return savedVacation;
  }

  async approveBookingRequest(bookingId: string) {
    console.log(bookingId);
    const booking = await this.bookingRepository.findOneOrFail({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new Error("Item with this ID not found");
    }

    if (
      booking.status === BookingStatus.Approved ||
      booking.status === BookingStatus.Rejected
    ) {
      throw new Error(
        "Booking request already approved or rejected, check status in database."
      );
    } else {
      booking.status = BookingStatus.Approved;
      await this.bookingRepository.save(booking);

      return booking;
    }
  }
}
