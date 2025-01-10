const Analytics: React.FC<any> = () => {
    return (
        <>
            <div className="w-full gap-10 max-w-full flex flex-col relative  justify-between items-center  h-dvh  text-black py-2 px-10" >
                <div className="bg-white rounded-sm mb-2 p-5 mt-0 md:mt-20 w-[80%] flex items-center justify-center flex-col md:w-fit static">
                    <h2>Total No of Patients</h2>
                    <h2>Total No of Diets</h2>
                    <h2>Total No of Patients</h2>
                    <h2>Total No of Deliveries</h2>
                    <hr className="mt-2"></hr>
                </div>
                <div className="grid md:grid-cols-2 place-items-center place-content-center">
                </div>
            </div>
        </>
    )
}

export default Analytics;