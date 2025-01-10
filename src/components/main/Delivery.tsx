import { useState } from "react";

const Delivery: React.FC<any> = () => {
    const [isOptSent, setIsOTPSent] = useState(false);
    const [isVarified, setIsVarified] = useState(false);

    return (
        <>

            {
                isVarified &&
                <div className="h-dvh absolute w-full text-black pt-10 flex  items-center  flex-col bg-slate-500  p-5">
                    <div className="w-fit p-10 bg-white rounded-lg items-center justify-center flex flex-col border-2">
                        <h3>Orderd Have been successfully delivered</h3>
                        <div className="h-14 w-14 rounded-full flex items-center justify-center bg-green-400">
                        ✔️
                        </div>  
                        <div className="flex gap-2 mt-3 flex-col">
                            Want to add some additional notes ?
                            <textarea rows={4} className="bg-gray-300"></textarea>
                            <button onClick={()=>{setIsVarified(false)}}>Save</button>
                        </div>
                    </div>
                </div>
            }

            <div className="flex flex-col items-center pt-10 min-h-dvh gap-10">
                <div className="card h-fit p-5 bg-white rounded-sm text-black mt-5">
                    <div className="font-bold text-center mb-5">Delivery Detail</div>
                    <div>
                        <div className="font-bold underline">Patients Detail</div>
                        <div className="text-gray-600 font-normal">
                            <p>Patient's Name : Radhe Shayan</p>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold underline">Meal Detail</div>
                        <div className="text-gray-600 font-normal">
                            <p>Meal : Lunch</p>
                            <p>Type : Veg</p>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold underline">Delivery Instruction</div>
                        <div className="text-gray-600 font-normal">
                            Handover to my dad
                        </div>
                    </div>
                </div>

                {
                    !isOptSent &&
                    <div className="flex w-fit h-full flex-col">
                        <button className="h-fit font-bold" onClick={() => { setIsOTPSent(!isOptSent) }}>Deliver Meal</button>
                    </div>
                }

                {isOptSent &&
                    <div className="flex flex-col gap-10">
                        <div>
                            Plase enter OTP sent to patients mobile
                        </div>
                        <div className="flex items-center gap-10 justify-center flex-col">
                            <input type="text" className="h-12 bg-gray-300 rounded-md ring-2 text-black ring-purple-500"></input>
                            <button className="h-fit bg-green-500" onClick={() => { setIsVarified(!isVarified) }}>Verify OTP</button>
                        </div>
                    </div>
                }
            </div>

        </>
    )
}

export default Delivery;