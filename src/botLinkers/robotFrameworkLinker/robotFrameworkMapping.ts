export interface RobotFrameworkKeyword {
  library: string;
  keyword: string;
}

const robotFrameworkMapping: Record<string, RobotFrameworkKeyword> = {
  ExcelReadCell: { library: "Excel.Application", keyword: "Read Cell" },
  GSuiteGetEmails: { library: "Excel.Application", keyword: "Read Cell" },
  GSuiteReadCellValue: { library: "Excel.Application", keyword: "Read Cell" },
  GSuiteSendEmail: { library: "Excel.Application", keyword: "Read Cell" },
  BinaryDecision: { library: "Excel.Application", keyword: "Read Cell" },
  OutlookGetEmails: { library: "Microsoft.Outlook", keyword: "Get Email" },
};

export default robotFrameworkMapping;
