import emp from "../models/employee.js"
import { intcmdqtControler } from "../integration/controller/intcmdqt.js";
import { intcmdqController } from "../integration/controller/intcmdq.js";
import { connectorController } from "../integration/connector.js";

export const getemp = async (req, res) => {
    try {
        const { id } = req.params;
        const getEmp = await emp.findOne({ userId: id });
        const integrationData = {
            commandProviderLinkId: 2,
            providerId: 1,
            commandId: 2,
            status: 1,
            jsonpara: { id },
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
        res.json({
            message : "Data fetched succesfully",
            getEmp,
            intcmdq: intcmdqdata,
            intcmdqt: intcmdqtData,
            connector: connectorControllerData,
        });
        console.log(getEmp);
    }
    catch (err) {
        res.json(err)
    }
}
