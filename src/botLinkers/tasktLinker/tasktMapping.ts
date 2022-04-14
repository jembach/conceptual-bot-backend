export interface TasktCommand {
  command: string;
}

const tasktMapping: Record<string, TasktCommand> = {
  ExcelReadCell: { command: "ExcelApplicationGetCell" },
  GSuiteGetEmails: { command: "GoogleGetEmails" },
  GSuiteReadCellValue: { command: "GoogleReadCell" },
  GSuiteSendEmail: { command: "GoogleSetEmail" },
  BinaryDecision: { command: "BinaryDecision" },
  OutlookGetEmails: { command: "OutlookApplicationGetEmails" },
};

export default tasktMapping;
