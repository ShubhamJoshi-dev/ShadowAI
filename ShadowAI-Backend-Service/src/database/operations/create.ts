class CreateOpertaion{
    public async create(
        payload:object,
        model:any)
        {
            const saveresult = model.create({
                ...payload
            })
            return saveresult
        }
}

const createInstance =()=>{
    return new CreateOpertaion
}
export default createInstance