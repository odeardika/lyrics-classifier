"use client";
import React from "react";
import Headers from "@components/Header/Header";
import fetchPrediction from "@/module/predict";

export default function page() {
    const emotionsDict = {
        null: "null",
        0: "sad",
        1: "happy"
    }
    const [lyrics, setLyrics] = React.useState("");
    const [model, setModel] = React.useState(1);
    const [result, setResult] = React.useState(null);

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLyrics(e.target.value);
    }

    const handlePredictClick = async () => {
        const response = await fetchPrediction(lyrics, model);

        if (response.status === 200) {
            setResult(response.data.emotion);
        } else {
            console.error("Error fetching prediction:", response.statusText);
        }
    }

    return (
        <div className="">
            <Headers />

            <div className="flex flex-col items-center justify-center ">
                <h1 className="text-2xl text-sky-600 font-bold my-5">Clasify Lyrics</h1>
                <div className="flex flex-col items-center justify-center w-full md:w-3/4 px-6">
                    <textarea
                        name="lyrics"
                        placeholder="Enter lyrics here..."
                        rows={10}
                        className="w-full p-2 border border-gray-300 rounded-t-md"
                        value={lyrics}
                        onChange={handleTextAreaChange}
                    ></textarea>
                    <div className="w-full flex items-center border border-gray-300 border-t-0 p-4 justify-start bg-sky-100 rounded-b-md">
                        <button
                            type="submit"
                            className="bg-sky-600 text-white p-2 rounded-md hover:bg-sky-700"
                            onClick={handlePredictClick}
                        >
                            Predict
                        </button>
                    </div>

                    {
                        result !== null && (
                            <div id="Result" className="border border-gray-300 rounded-md w-full my-5 p-4">
                                <h2>Result : </h2>
                                <p>The text <span className="text-sky-600">data</span> you're input is <span className={`${(result === 0) ? "text-red-500" : "text-green-500"}`}>{emotionsDict[result]}</span></p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
