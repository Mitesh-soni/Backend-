import emp from "../models/employee.js"
import { intcmdqtControler } from "../integration/controller/intcmdqt.js";
import { intcmdqController } from "../integration/controller/intcmdq.js";
import { connectorController } from "../integration/connector.js";

export const updateemp = async (req, res) => {
    try {
        const { id } = req.params;
        const setData = req.body
        const empUpdated = await emp.findOneAndUpdate({userId:id}, { setData }, { new: true });
        if (!empUpdated) {
           return res.json(`message: ${id} was not in entire modle`)
        }
         const integrationData = {
                    commandProviderLinkId: 3,
                    providerId: 1,
                    commandId: 3,
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
            empUpdated,
            intcmdq: intcmdqdata,
            intcmdqt: intcmdqtData,
            connector: connectorControllerData,
        });
    }
    catch (err) {
        res.json(err)
    }
}
