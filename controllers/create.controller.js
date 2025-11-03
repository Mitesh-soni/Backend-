import emp from "../models/employee.js"
// import intcmdqt from "../integration/models/intcmdqt.js";
// import intcmdq from "../integration/models/intcmdq.js";
// import { connector } from "../integration/connector.js";

export const createemp = async (req, res) => {
    try {
        const empdata = req.body;
        const newEmp = new emp(empdata);
        const savedata = await newEmp.save();
        // let intcmdq=await intcmdq(integrationdata);
        // let intcmdqt=await intcmdqt(res);
        // let connector=await connector(res);
        if(!savedata ){
            res.status(400).json("user was exist");
        }
        res.status(201).json({
            employee: savedata
        });
        
    }
    catch (err) {
        res.json(err);
    }
}