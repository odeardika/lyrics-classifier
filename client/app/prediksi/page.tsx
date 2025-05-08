"use client";
import React from "react";
import Headers from "@components/Header/Header";
import fetchPrediction from "@/module/predict";
import Image from "next/image";
// import ConfidenceBar from "@components/Result/ConfidenceBar/ConfidenceBar";
import DecisionBar from "@components/Result/DecisionBar/DecisionBar";
import Probabilities from "@components/Result/Probabilities/Probabilities";

export default function Page() {
    const emotionsDict = {
        null: "null",
        0: "sedih",
        1: "bahagia"
    };
    const [lyrics, setLyrics] = React.useState("");
    const [model, setModel] = React.useState(1);
    const [result, setResult] = React.useState(null);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [isLyricsNotValid, setIsLyricsNotValid] = React.useState(false);
    const [showMore, setShowMore] = React.useState(false);
    // const [confidenceScore, setConfidenceScore] = React.useState(0);
    const [decisionValue, setDecisionValue] = React.useState(0);
    const [distance, setDistance] = React.useState(0);
    const [probabilitiesHappy, setProbabilitiesHappy] = React.useState(0);
    const [probabilitiesSad, setProbabilitiesSad] = React.useState(0);

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLyrics(e.target.value);
    }

    const handlePredictClick = async () => {
        setIsLyricsNotValid(false);
        if (lyrics.trim() === "") {
            setIsLyricsNotValid(true);
            return;
        }
        const response = await fetchPrediction(lyrics, model);

        if (response.status === 200) {
            setResult(response.data.emotion);

            if (model === 1) {
                setProbabilitiesHappy(response.data.probabilities.happy);
                setProbabilitiesSad(response.data.probabilities.sad);
            }
            if (model === 2) {
                // setConfidenceScore(response.data.confidence_scores.confidence_scores);
                setDecisionValue(response.data.confidence_scores.decision_values);
                setDistance(response.data.confidence_scores.distances);
            }
        } else {
            console.error("Error fetching prediction:", response.statusText);
        }
    }
    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    }
    const handleDropdownSelector = (model : number) => {
        setResult(null);
        setModel(model);
        setDropdownOpen(false);
    }

    return (
        <div className="">
            <Headers />

            <div className="flex flex-col items-center justify-center ">
                <h1 className="text-2xl text-sky-600 font-bold my-5">Pengklasifikasi Lirik</h1>
                <div className="flex flex-col items-center justify-center w-full md:w-3/4 px-6">
                    <textarea
                        name="lyrics"
                        placeholder="Masukkan lirik di sini..."
                        rows={10}
                        className="w-full p-2 border border-gray-300 rounded-t-md"
                        value={lyrics}
                        onChange={handleTextAreaChange}
                    ></textarea>
                    <div className="w-full flex items-center border border-gray-300 border-t-0 p-4 justify-between bg-sky-100 rounded-b-md">
                        <button
                            type="submit"
                            className="bg-sky-600 text-white p-2 rounded-md hover:bg-sky-700 hover:cursor-pointer"
                            onClick={handlePredictClick}
                        >
                            Prediksi
                        </button>
                        <div className="dropdown flex flex-col items-center">
                            <div className="flex items-center justify-end gap-2 p-1 w-full rounded-sm hover:cursor-pointer hover:bg-sky-200" onClick={handleDropdownToggle}>
                                <span>{model === 1 ? "Naïve Bayes" : "SVM"}</span>   
                                <Image src={"/icons/arrow-drop-down.svg"} alt="dropdown arrow" width={0} height={0} className="w-5 h-5" />
                            </div>
                            {dropdownOpen && (
                                <div className="dropdown-content absolute bg-white border border-gray-300 rounded-md mt-2">
                                    <ul>
                                        <li className="hover:bg-sky-200 hover:cursor-pointer p-2" onClick={() => handleDropdownSelector(1)}>Naïve Bayes</li>
                                        <li className="hover:bg-sky-200 hover:cursor-pointer p-2" onClick={() => handleDropdownSelector(2)}>SVM</li>
                                    </ul>
                                </div>
                            )}
                            
                        </div>
                    </div>
                    {
                        isLyricsNotValid && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5 w-full" role="alert">
                                <strong className="font-bold">Kesalahan!</strong>
                                <span className="block sm:inline"> Silakan masukkan lirik terlebih dahulu.</span>
                            </div>
                        )
                    }

                    {
                        result !== null && (
                            <div id="Result" className="border border-gray-300 rounded-md w-full my-5 p-4">
                                <h2>Hasil : </h2>
                                <p className="mb-2">Teks <span className="text-sky-600">data</span> yang Anda masukkan adalah <span className={`${(result === 0) ? "text-red-500" : "text-green-500"}`}>{emotionsDict[result]}</span></p>
                                <div className={`${showMore ? "" : "hidden"}`}>
                                    {
                                        (model === 1) ? (
                                            <>
                                            <Probabilities probabilities={{ happy: probabilitiesHappy, sad: probabilitiesSad }} />
                                            </>
                                        ) : (
                                            <div className="flex flex-col gap-2">
                                                {/* <ConfidenceBar score={confidenceScore} /> */}
                                                <DecisionBar decisionValue={decisionValue} distance={distance} />
                                            </div>
                                        )
                                    }
                                </div>
                                <div 
                                className="text-sm text-blue-600 cursor-pointer select-none underline"
                                onClick={() => setShowMore(!showMore)}
                                >{showMore ? "lebih sedikit" : "lebih banyak"}</div>
                                
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
