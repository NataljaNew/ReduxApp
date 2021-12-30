export default ({labelName,reference,type})=>{
    return(
        <div className="mb-3">
            <label htmlFor={labelName} className="form-label">{labelName}</label>
            <input type={type} className="form-control" id={labelName} placeholder={labelName} ref={reference}/>
        </div>
    )
}