import drink from "../../assets/drink.svg"
import lunch from "../../assets/meal.svg"

const Home: React.FC<any> = () => {
    return (
        <>
            <div className="w-[80%] text-white items-center flex-wrap flex-col-reverse justify-center  h-[500px] flex md:flex-row   gap-10 ">
                <div className="flex font-bold flex-col">
                    <h1>Aaahar</h1>
                    <h2 className="italic">Meal that heals you !!</h2>
                </div>
                <div className="flex">
                    <div className="h-28">
                        <img src={drink} alt="drinkImage" className="h-full animate-bounce"></img>
                    </div>
                    <div className="h-28">
                        <img src={lunch} alt="drinkImage" className="h-full"></img>
                    </div>
                </div>
            </div>


            <div className="w-[80%] flex flex-col gap-20 flex-wrap min-h-[400px] items-center ">
                <h3 className="text-3xl underline">We provide food that is </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 text-black gap-10 font-bold place-items-center place-content-center">
                    <div className="flex flex-row-reverse p-5 bg-[#Fead00] min-w-[250px] justify-center items-center  gap-2">
                        <label htmlFor="healtyfood">Healty & Hygenic</label>
                        <input type="checkbox" checked className="whatcheck"></input>
                    </div>
                    <div className="flex p-5 bg-[#Fead00] min-w-[250px] justify-center items-center flex-row-reverse gap-2">
                        <label htmlFor="healtyfood">100% Naturals</label>
                        <input type="checkbox" className="whatcheck" checked></input>
                    </div>
                    <div className="flex p-5 bg-[#Fead00] min-w-[250px] justify-center items-center flex-row-reverse gap-2">
                        <label htmlFor="healtyfood">Delivered in Time</label>
                        <input type="checkbox" className="whatcheck" checked></input>
                    </div>
                    <div className="flex p-5 bg-[#Fead00] min-w-[250px] justify-center items-center flex-row-reverse gap-2">
                        <label htmlFor="healtyfood">Follows yours diet</label>
                        <input type="checkbox" className="whatcheck" checked></input>
                    </div>

                </div>
            </div>

            <div className="w-[80%] min-h-[400px] mt-10 justify-center gap-20 items-center flex flex-col">
                <h4 className="text-3xl underline ">We in numbers</h4>
                <div className="flex gap-5 h-full  items-center justify-center flex-wrap">
                    <div className="p-5 bg-[#Fead00] text-black flex items-center justify-center font-bold min-w-[90%]">
                        500+ Patients Served
                    </div>
                    <div className="p-5 bg-[#Fead00] text-black flex items-center justify-center font-bold min-w-[90%]">
                        50+ Hospitals Span
                    </div>
                    <div className="p-5 bg-[#Fead00] text-black flex items-center justify-center font-bold min-w-[90%]">
                        50K+ Meals Deliverd
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;