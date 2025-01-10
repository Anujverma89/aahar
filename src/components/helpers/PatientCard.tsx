import { MouseEventHandler } from "react";
import editicon from "../../assets/edit.svg";
import deleteicon from "../../assets/delete.svg";
import viewicon from "../../assets/eye.svg"

interface patient {
    name: string,
    roomno: string,
    edit: MouseEventHandler,
    view: MouseEventHandler,
    deletepatient: MouseEventHandler,
    key:number,
    id:string,
}

const PatientCard: React.FC<patient> = ({ name, roomno, edit, view ,deletepatient ,key,id}) => {
    const imagedivclass="flex h-full w-full p-2 border border rounded-sm cursor-pointer shadow-md"
    const identifyclass = "h-full flex justify-center items-center";
    return (
        <div className="w-full h-full flex justify-between  p-5  bg-white rounded-sm shadow-md md:px-10" key={key}>
            <div className="flex gap-3">
                <div className={identifyclass} title="Patient's Name">
                    {name}
                </div>
                <div className={identifyclass} title="Room No">
                    {roomno}
                </div>
            </div>

            <div className="flex items-center justify-center gap-3">
                <div className={imagedivclass} title="Edit patient Detail"  >
                    <img src={editicon} alt="editicon" id={id} onClick={edit}></img>
                </div>
                <div className={imagedivclass} title="View patient Detail" >
                    <img src={viewicon} alt="viewicon" id={id} onClick={view}></img>
                </div>
                <div className={imagedivclass} title="Delete Patient Detail">
                    <img src={deleteicon} alt="deleteicon" id={id} onClick={deletepatient}></img>
                </div>
            </div>
        </div>
    )
}

export default PatientCard;