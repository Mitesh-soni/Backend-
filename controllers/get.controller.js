import emp from "../models/employee.js"
export const getemp = async (req, res) => {
    try {
        const  { key, value } =req.params;
        const filter = { [key]: value };
        const Emp = await emp.findOne(filter);
        res.json({
            employee:Emp ,
        });
        console.log(Emp);
    }
    catch(err){
        res.json(err)
    }
}
