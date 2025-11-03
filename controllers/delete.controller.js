import emp from "../models/employee.js"

export const deleteemp = async (req, res) => {
    try {
        const { key, value } = req.params;
        const filter ={[key]:value}
        const deleteemp = await emp.findOneAndDelete(filter);
        res.json({
            employee: deleteemp,
        });
    }
    catch (err) {
        res.json(err)
    }
}