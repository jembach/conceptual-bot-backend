import { RpaContextContainer } from "src/interfaces/RpaOperation";

export const rpaContextContainers: Record<string, RpaContextContainer> = {
  WithBrowser: {
    id: "WithBrowser",
    iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#WithBrowser",
    setupSteps: [
      {
        id: "BrowserOpen",
        iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#BrowserOpen",
        concept: {
          id: "software-start-operation",
          iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#software-start-operation",
          type: {
            id: "software-control-operation",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#software-control-operation",
            type: {
              id: "automation-operation",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#automation-operation",
              type: {
                id: "rpa-operation",
                iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#rpa-operation",
              },
              bpmoConcept: "AtomicActivity",
              label: "Automation Operation",
              comment:
                "AutomationOperations are the most prominent type of RPA operations. They access external data, operate on applications, call services, or automate aspects of the operating system.",
            },
            label: "Software Control Operation",
            comment:
              "Software Control Operations manage software in more general, independent of data. They do not access data, but, for example, can start and stop applications.",
          },
          label: "Software Start Operation",
          comment: "Starts a new instance of the software.",
        },
        automates: {
          id: "Browser",
          iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#Browser",
          concept: {
            id: "browser",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#browser",
            type: {
              id: "application",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#application",
              type: {
                id: "software",
                iri: "http://cos.ontoware.org/cso#software",
              },
              label: "Application",
            },
            label: "Browser",
            comment: "An application to open and navigate web pages.",
          },
        },
        bpmoConcept: "AtomicActivity",
      },
      {
        id: "BrowserOpenURL",
        iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#BrowserOpenURL",
        concept: {
          id: "open-file",
          iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#open-file",
          type: {
            id: "data-file-operation",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#data-file-operation",
            type: {
              id: "data-operation",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#data-operation",
              type: {
                id: "automation-operation",
                iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#automation-operation",
                type: {
                  id: "rpa-operation",
                  iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#rpa-operation",
                },
                bpmoConcept: "AtomicActivity",
                label: "Automation Operation",
                comment:
                  "AutomationOperations are the most prominent type of RPA operations. They access external data, operate on applications, call services, or automate aspects of the operating system.",
              },
              label: "Data Operation",
              comment:
                "Data operations access CSO:Data and differ in whether data is read, written, transformed, or whether the file itself is manipulated.",
            },
            label: "Data File Operation",
          },
          label: "Open File",
          comment: "Opens a given file.",
        },
        automates: {
          id: "Browser",
          iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#Browser",
          concept: {
            id: "browser",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#browser",
            type: {
              id: "application",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#application",
              type: {
                id: "software",
                iri: "http://cos.ontoware.org/cso#software",
              },
              label: "Application",
            },
            label: "Browser",
            comment: "An application to open and navigate web pages.",
          },
        },
        bpmoConcept: "AtomicActivity",
      },
    ],
    cleanupSteps: [
      {
        id: "BrowserClose",
        iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#BrowserClose",
        concept: {
          id: "software-close-operation",
          iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#software-close-operation",
          type: {
            id: "software-control-operation",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#software-control-operation",
            type: {
              id: "automation-operation",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#automation-operation",
              type: {
                id: "rpa-operation",
                iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#rpa-operation",
              },
              bpmoConcept: "AtomicActivity",
              label: "Automation Operation",
              comment:
                "AutomationOperations are the most prominent type of RPA operations. They access external data, operate on applications, call services, or automate aspects of the operating system.",
            },
            label: "Software Control Operation",
            comment:
              "Software Control Operations manage software in more general, independent of data. They do not access data, but, for example, can start and stop applications.",
          },
          label: "Software Close Operation",
          comment: "Terminates the current instance of the software.",
        },
        automates: {
          id: "Browser",
          iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#Browser",
          concept: {
            id: "browser",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#browser",
            type: {
              id: "application",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#application",
              type: {
                id: "software",
                iri: "http://cos.ontoware.org/cso#software",
              },
              label: "Application",
            },
            label: "Browser",
            comment: "An application to open and navigate web pages.",
          },
        },
        bpmoConcept: "AtomicActivity",
      },
    ],
  },
  WithMicrosoftExcel: {
    id: "WithMicrosoftExcel",
    iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#WithMicrosoftExcel",
    setupSteps: [
      {
        id: "ExcelOpen",
        iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#ExcelOpen",
        concept: {
          id: "software-start-operation",
          iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#software-start-operation",
          type: {
            id: "software-control-operation",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#software-control-operation",
            type: {
              id: "automation-operation",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#automation-operation",
              type: {
                id: "rpa-operation",
                iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#rpa-operation",
              },
              bpmoConcept: "AtomicActivity",
              label: "Automation Operation",
              comment:
                "AutomationOperations are the most prominent type of RPA operations. They access external data, operate on applications, call services, or automate aspects of the operating system.",
            },
            label: "Software Control Operation",
            comment:
              "Software Control Operations manage software in more general, independent of data. They do not access data, but, for example, can start and stop applications.",
          },
          label: "Software Start Operation",
          comment: "Starts a new instance of the software.",
        },
        automates: {
          id: "MicrosoftExcel",
          iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#MicrosoftExcel",
          concept: {
            id: "spreadsheet-application",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#spreadsheet-application",
            type: {
              id: "application",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#application",
              type: {
                id: "software",
                iri: "http://cos.ontoware.org/cso#software",
              },
              label: "Application",
            },
            label: "Spreadsheet Application",
            comment: "A software for organizing data in tabular form.",
          },
          supports: {
            id: "ExcelWorkbook",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#ExcelWorkbook",
            concept: {
              id: "spreadsheet",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#spreadsheet",
              type: {
                id: "file",
                iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#file",
                type: {
                  id: "data",
                  iri: "http://cos.ontoware.org/cso#data",
                },
                label: "File",
                comment: "Files are data that are not executable.",
              },
              label: "Spreadsheet",
              comment: "Data stored in tabular form.",
            },
          },
        },
        bpmoConcept: "AtomicActivity",
      },
      {
        id: "ExcelOpenWorkbook",
        iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#ExcelOpenWorkbook",
        concept: {
          id: "open-file",
          iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#open-file",
          type: {
            id: "data-file-operation",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#data-file-operation",
            type: {
              id: "data-operation",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#data-operation",
              type: {
                id: "automation-operation",
                iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#automation-operation",
                type: {
                  id: "rpa-operation",
                  iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#rpa-operation",
                },
                bpmoConcept: "AtomicActivity",
                label: "Automation Operation",
                comment:
                  "AutomationOperations are the most prominent type of RPA operations. They access external data, operate on applications, call services, or automate aspects of the operating system.",
              },
              label: "Data Operation",
              comment:
                "Data operations access CSO:Data and differ in whether data is read, written, transformed, or whether the file itself is manipulated.",
            },
            label: "Data File Operation",
          },
          label: "Open File",
          comment: "Opens a given file.",
        },
        automates: {
          id: "MicrosoftExcel",
          iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#MicrosoftExcel",
          concept: {
            id: "spreadsheet-application",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#spreadsheet-application",
            type: {
              id: "application",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#application",
              type: {
                id: "software",
                iri: "http://cos.ontoware.org/cso#software",
              },
              label: "Application",
            },
            label: "Spreadsheet Application",
            comment: "A software for organizing data in tabular form.",
          },
          supports: {
            id: "ExcelWorkbook",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#ExcelWorkbook",
            concept: {
              id: "spreadsheet",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#spreadsheet",
              type: {
                id: "file",
                iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#file",
                type: {
                  id: "data",
                  iri: "http://cos.ontoware.org/cso#data",
                },
                label: "File",
                comment: "Files are data that are not executable.",
              },
              label: "Spreadsheet",
              comment: "Data stored in tabular form.",
            },
          },
        },
        accesses: {
          id: "ExcelWorkbook",
          iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#ExcelWorkbook",
          concept: {
            id: "spreadsheet",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#spreadsheet",
            type: {
              id: "file",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#file",
              type: {
                id: "data",
                iri: "http://cos.ontoware.org/cso#data",
              },
              label: "File",
              comment: "Files are data that are not executable.",
            },
            label: "Spreadsheet",
            comment: "Data stored in tabular form.",
          },
        },
        bpmoConcept: "AtomicActivity",
      },
    ],
    cleanupSteps: [
      {
        id: "ExcelSaveWorkbook",
        iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#ExcelSaveWorkbook",
        concept: {
          id: "save-file",
          iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#save-file",
          type: {
            id: "data-file-operation",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#data-file-operation",
            type: {
              id: "data-operation",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#data-operation",
              type: {
                id: "automation-operation",
                iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#automation-operation",
                type: {
                  id: "rpa-operation",
                  iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#rpa-operation",
                },
                bpmoConcept: "AtomicActivity",
                label: "Automation Operation",
                comment:
                  "AutomationOperations are the most prominent type of RPA operations. They access external data, operate on applications, call services, or automate aspects of the operating system.",
              },
              label: "Data Operation",
              comment:
                "Data operations access CSO:Data and differ in whether data is read, written, transformed, or whether the file itself is manipulated.",
            },
            label: "Data File Operation",
          },
          label: "Save File",
          comment: "Saves the file.",
        },
        automates: {
          id: "MicrosoftExcel",
          iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#MicrosoftExcel",
          concept: {
            id: "spreadsheet-application",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#spreadsheet-application",
            type: {
              id: "application",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#application",
              type: {
                id: "software",
                iri: "http://cos.ontoware.org/cso#software",
              },
              label: "Application",
            },
            label: "Spreadsheet Application",
            comment: "A software for organizing data in tabular form.",
          },
          supports: {
            id: "ExcelWorkbook",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#ExcelWorkbook",
            concept: {
              id: "spreadsheet",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#spreadsheet",
              type: {
                id: "file",
                iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#file",
                type: {
                  id: "data",
                  iri: "http://cos.ontoware.org/cso#data",
                },
                label: "File",
                comment: "Files are data that are not executable.",
              },
              label: "Spreadsheet",
              comment: "Data stored in tabular form.",
            },
          },
        },
        accesses: {
          id: "ExcelWorkbook",
          iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#ExcelWorkbook",
          concept: {
            id: "spreadsheet",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#spreadsheet",
            type: {
              id: "file",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#file",
              type: {
                id: "data",
                iri: "http://cos.ontoware.org/cso#data",
              },
              label: "File",
              comment: "Files are data that are not executable.",
            },
            label: "Spreadsheet",
            comment: "Data stored in tabular form.",
          },
        },
        bpmoConcept: "AtomicActivity",
      },
      {
        id: "ExcelClose",
        iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#ExcelClose",
        concept: {
          id: "software-close-operation",
          iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#software-close-operation",
          type: {
            id: "software-control-operation",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#software-control-operation",
            type: {
              id: "automation-operation",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#automation-operation",
              type: {
                id: "rpa-operation",
                iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#rpa-operation",
              },
              bpmoConcept: "AtomicActivity",
              label: "Automation Operation",
              comment:
                "AutomationOperations are the most prominent type of RPA operations. They access external data, operate on applications, call services, or automate aspects of the operating system.",
            },
            label: "Software Control Operation",
            comment:
              "Software Control Operations manage software in more general, independent of data. They do not access data, but, for example, can start and stop applications.",
          },
          label: "Software Close Operation",
          comment: "Terminates the current instance of the software.",
        },
        automates: {
          id: "MicrosoftExcel",
          iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#MicrosoftExcel",
          concept: {
            id: "spreadsheet-application",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#spreadsheet-application",
            type: {
              id: "application",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#application",
              type: {
                id: "software",
                iri: "http://cos.ontoware.org/cso#software",
              },
              label: "Application",
            },
            label: "Spreadsheet Application",
            comment: "A software for organizing data in tabular form.",
          },
          supports: {
            id: "ExcelWorkbook",
            iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#ExcelWorkbook",
            concept: {
              id: "spreadsheet",
              iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#spreadsheet",
              type: {
                id: "file",
                iri: "http://www.semanticweb.org/maximilian.voelker/ontologies/rpa-operations#file",
                type: {
                  id: "data",
                  iri: "http://cos.ontoware.org/cso#data",
                },
                label: "File",
                comment: "Files are data that are not executable.",
              },
              label: "Spreadsheet",
              comment: "Data stored in tabular form.",
            },
          },
        },
        bpmoConcept: "AtomicActivity",
      },
    ],
  },
};
