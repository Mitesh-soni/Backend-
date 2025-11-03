import emp from "../models/employee.js"
import { intcmdqtControler } from "../integration/controller/intcmdqt.js";
import { intcmdqController } from "../integration/controller/intcmdq.js";
import { json } from "express";
// import { connector } from "../integration/connector.js";

export const createemp = async (req, res) => {
    try {
        const empdata = req.body;
        const newEmp = new emp(empdata);
        const savedata = await newEmp.save();
        // console.log(savedata + "This is prited by console");


        if (!savedata) {
            return res.status(400).json("user was exist");
        }

        const integrationData = {
            commandProviderLinkId: 1,
            providerId: 1,
            commandId: 1,
            status: 1,
            jsonpara: empdata
        }
        let intcmdqdata = await intcmdqController(integrationData);
        // console.log(intcmdqdata,"here...");
        let intcmdqtData = await intcmdqtControler(integrationData, intcmdqdata);
        // let connector=await connector(integrationData);
        return res.status(201).json({
            employee: savedata,
            intcmdq: intcmdqdata,
            intcmdqt: intcmdqtData
        });
    }
    catch (err) {
        res.json(err);
    }
}