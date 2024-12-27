import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth-guard";
import { LeaveDocumentationService } from "./leave_documentation.service";
import { LeaveDocumentation } from "./entities/leave_documentation.entity";

@UseGuards(AuthGuard)
@Controller("leave_documentation")
export class LeaveDocumentationController {
  constructor(
    private readonly leaveDocumentationService: LeaveDocumentationService
  ) {}

  @Post("create")
  async createLeaveDocumentation(
    @Body() data: Partial<LeaveDocumentation>
  ): Promise<LeaveDocumentation> {
    return this.leaveDocumentationService.createLeaveDocumentation(data);
  }

  @Get(":id")
  async getLeaveDocumentation(
    @Param("id") id: string
  ): Promise<LeaveDocumentation> {
    return this.leaveDocumentationService.getLeaveDocumentation(id);
  }

  @Get()
  async getAllDocuments() {
    return this.leaveDocumentationService.findAll();
  }
}
