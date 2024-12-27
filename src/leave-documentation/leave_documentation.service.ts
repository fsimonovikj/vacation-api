import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LeaveDocumentation } from "./entities/leave_documentation.entity";
import { Repository } from "typeorm";
import * as fs from "fs";
import * as path from "path";
import * as PDFDocument from "pdfkit";

@Injectable()
export class LeaveDocumentationService {
  constructor(
    @InjectRepository(LeaveDocumentation)
    private readonly leaveDocumentationRepository: Repository<LeaveDocumentation>
  ) {}

  async findAll() {
    return await this.leaveDocumentationRepository.find();
  }

  async createLeaveDocumentation(
    data: Partial<LeaveDocumentation>
  ): Promise<LeaveDocumentation> {
    // Step 1: Create the leave documentation record
    const leaveDocumentation = this.leaveDocumentationRepository.create(data);
    const savedLeave = await this.leaveDocumentationRepository.save(
      leaveDocumentation
    );

    // Step 2: Generate a PDF for the leave documentation
    const fileName = `${savedLeave.id}.pdf`;
    const filePath = path.join(
      process.cwd(),
      "public/documentations",
      fileName
    );

    // Generate the PDF
    await this.generatePDF(savedLeave, filePath);

    // Step 3: Update the record with the file path
    savedLeave.filePath = `/documentations/${fileName}`;
    savedLeave.fileName = fileName;
    await this.leaveDocumentationRepository.save(savedLeave);

    return this.leaveDocumentationRepository.findOne({
      where: { id: savedLeave.id },
    });
  }

  async getLeaveDocumentation(id: string): Promise<LeaveDocumentation> {
    return this.leaveDocumentationRepository.findOne({
      where: { id },
      relations: ["user", "plan"], // Fetch related entities
    });
  }

  private async generatePDF(
    leave: LeaveDocumentation,
    filePath: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const dir = path.dirname(filePath);

      // Ensure the directory exists
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const doc = new PDFDocument();
      const writeStream = fs.createWriteStream(filePath);

      doc.pipe(writeStream);

      // Add content to the PDF
      doc.fontSize(20).text("Leave Documentation", { align: "center" });
      doc.moveDown();

      doc.fontSize(14).text(`Title: ${leave.title}`);
      doc.text(`Days: ${leave.days}`);
      doc.text(`Start Date: ${leave.startAt}`);
      doc.text(`End Date: ${leave.endAt}`);
      doc.text(`User: ${leave.user?.firstName} ${leave.user?.lastName}`);
      doc.text(`Vacation Type: ${leave.type}`);
      doc.text(`Legal Obligation: ${leave.legalObligation || "N/A"}`);
      doc.text(`Vacation: ${leave.vacation?.title || "N/A"}`);

      doc.end();

      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
  }
}
