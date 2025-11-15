import emp from "../models/employee.js"
import { intcmdqtControler } from "../integration/controller/intcmdqt.js";
import { intcmdqController } from "../integration/controller/intcmdq.js";
import { connectorController } from "../integration/connector.js";

export const deleteemp = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Key or value missing in request params" });
    }

    // Step 1: Delete employee
    const deletedEmp = await emp.findOneAndDelete({ userId: id });

    if (!deletedEmp) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const integrationData = {
      commandProviderLinkId: 4,
      providerId: 1,
      commandId: 4,
      status: 1,
      jsonpara: {id},
    };

    const intcmdqdata = await intcmdqController(integrationData);
    const intcmdqtData = await intcmdqtControler({
      ...integrationData,
      trno: intcmdqdata?.data?.trno,
    });

    const connectorControllerData = await connectorController(
      integrationData,
      intcmdqdata,
      intcmdqdata?.data?.trno
    );


    return res.status(200).json({
      message: "Employee deleted successfully",
      deletedEmp,
      intcmdq: intcmdqdata,
      intcmdqt: intcmdqtData,
      connector: connectorControllerData,
    });
  } catch (err) {
    console.error("Error in deleteemp:", err.message);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
