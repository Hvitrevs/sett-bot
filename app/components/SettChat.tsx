"use client";

import React, { useState, useEffect } from "react";
import Timer from "./timer";

type EnemyInput = {
  name: string;
  item?: string;
};

type PickedChampion = {
  championName: string;
  counterTo: EnemyInput[];
};

type Champion = {
  id: string;
  name: string;
  tags: string[]; 
  image: {
    full: string;
  };
};

export default function SettChat() {
  const [output, setOutput] = useState(
    "Hello! Enter an enemy champion name to get counter picks."
  );
  const [input, setInput] = useState("");
  const [enemyInputs, setEnemyInputs] = useState<EnemyInput[]>([]);
  const [pickedChampions, setPickedChampions] = useState<PickedChampion[]>([]);
  const [champions, setChampions] = useState<Champion[]>([]);
  const [patchVersion, setPatchVersion] = useState<string>("13.18.1");

  useEffect(() => {
    async function fetchLatestData() {
      try {
        const versionsRes = await fetch(
          "https://ddragon.leagueoflegends.com/api/versions.json"
        );
        const versions = await versionsRes.json();
        const latestVersion = versions[0];
        setPatchVersion(latestVersion);

        const champRes = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`
        );
        const champData = await champRes.json();

        setChampions(Object.values(champData.data));
      } catch (error) {
        console.error("Error fetching champions:", error);
      }
    }
    fetchLatestData();
  }, []);

  // Dummy placeholder counters for now
  const placeholderCounters: Record<string, string[]> = {
    morgana: ["Nautilus", "Senna"],
    ahri: ["Leona", "Morgana"],
  };


  const filteredChampions =
    input.length === 2
      ? champions.filter((champ) =>
          champ.name.toLowerCase().startsWith(input.toLowerCase())
        )
      : [];

  function handleSend() {
    const enemyName = input.trim().toLowerCase();
    if (!enemyName) return;

    const counters = placeholderCounters[enemyName];
    if (!counters) {
      setOutput(`Sorry, no counters found for "${input}". Try another.`);
      setInput("");
      return;
    }

    if (enemyInputs.find((e) => e.name === enemyName)) {
      setOutput(
        `You already added ${input}. Best picks: ${counters
          .map((c, i) => `${i === 0 ? "1st" : "2nd"}: ${c}`)
          .join(", ")}`
      );
      setInput("");
      return;
    }

    setEnemyInputs((prev) => [...prev, { name: enemyName }]);
    setOutput(
      `For enemy ${input}, best picks are:\n1st: ${counters[0]}, 2nd: ${counters[1]}. Click a champion icon below to pick.`
    );
    setInput("");
  }

  function handlePickChampion(championName: string) {
    if (pickedChampions.find((p) => p.championName === championName)) return;

    setPickedChampions((prev) => [
      ...prev,
      { championName, counterTo: [...enemyInputs] },
    ]);

    setOutput(
      `You picked ${championName}. Here's the item build against your enemies.`
    );
  }

  function handleForfeit() {
    setEnemyInputs([]);
    setPickedChampions([]);
    setOutput("Session reset. Enter enemy champion name to start again.");
  }


  function getChampionIconUrl(name: string) {
    const champ = champions.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    return champ
      ? `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${champ.image.full}`
      : undefined;
  }


  const lastEnemy = enemyInputs[enemyInputs.length - 1];
  const currentCounters =
    lastEnemy && placeholderCounters[lastEnemy.name]
      ? placeholderCounters[lastEnemy.name]
      : [];

  return (
    <>
      <Timer active={pickedChampions.length > 0} />

      <div className="max-w-158 mx-auto p-4 space-y-6">
    
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg shadow-cyan-900 flex flex-col space-y-4">

          <div
            className="bg-cyan-950/30 rounded-lg p-4 h-28 overflow-y-auto whitespace-pre-wrap text-white font-mono"
            aria-live="polite"
          >
            {output}
          </div>

          <div className="flex space-x-3 flex-col">
            <input
              type="text"
              className="flex-grow rounded-lg px-4 py-2 text-gray-100 mb-2"
              placeholder="Enter enemy champion name (2 letters to search)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              autoComplete="off"
            />

            {/* Filtered champions show here only if input length === 2 */}
            {filteredChampions.length > 0 && (
              <div className="flex flex-wrap gap-3 border border-purple-600 rounded-lg p-2 max-h-170 overflow-y-auto bg-gray-800">
                {filteredChampions.map((champ) => (
                  <div
                    key={champ.id}
                    className="flex flex-col items-center space-y-2 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded border border-purple-600 p-2"
                  >
                    <button
                      onClick={() => {
                        setInput(champ.name);
                        setOutput(`You typed "${champ.name}". Press Send to confirm.`);
                      }}
                      className="flex flex-col items-center space-y-1"
                    >
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${champ.image.full}`}
                        alt={champ.name}
                        className="w-12 h-12 rounded-full border-2 border-purple-600 hover:border-purple-800"
                      />
                      <span className="text-purple-300 text-xs">{champ.name}</span>
                    </button>
                    {/* Champion info card */}
                    <div className="bg-gray-700 rounded-md p-2 w-36 text-center text-white text-xs">
                      <div>
                        Damage Type:{" "}
                        {champ.tags && champ.tags.length > 0 ? champ.tags[0] : "Unknown"}
                      </div>
                      <div className="italic mt-1 text-gray-300">Item build coming soon</div>
                      <div className="italic text-gray-300">Runes coming soon</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>


          {currentCounters.length > 0 && (
            <div className="flex justify-center space-x-6 mt-1">
              {currentCounters.map((champ) => {
                const icon = getChampionIconUrl(champ);
                return (
                  <button
                    key={champ}
                    onClick={() => handlePickChampion(champ)}
                    title={`Pick ${champ}`}
                    className="flex flex-col items-center space-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                  >
                    {icon ? (
                      <img
                        src={icon}
                        alt={champ}
                        className="w-14 h-14 rounded-full border-2 border-indigo-500 hover:border-indigo-700"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-700 rounded-full" />
                    )}
                    <span className="text-indigo-300 text-sm">{champ}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

    
        <div className="bg-gray-900 rounded-2xl p-5 shadow-md shadow-cyan-950">
          <h2 className="text-white text-lg font-semibold mb-4">
            Picked champions and item builds
          </h2>
          {pickedChampions.length === 0 && (
            <p className="text-gray-400">No champions picked yet.</p>
          )}
          <div className="space-y-4">
            {pickedChampions.map(({ championName, counterTo }) => {
              const icon = getChampionIconUrl(championName);
              return (
                <div
                  key={championName}
                  className="flex items-center space-x-4 bg-gray-800 rounded-xl p-3"
                >
                  {icon && (
                    <img
                      src={icon}
                      alt={championName}
                      className="w-16 h-16 rounded-full border-2 border-indigo-500"
                    />
                  )}
                  <div>
                    <div className="text-white font-semibold text-xl">{championName}</div>
                    <div className="text-indigo-300 text-sm">
                      Counters: {counterTo.map((e) => e.name).join(", ")}
                    </div>
                    <div className="mt-2 text-gray-300 italic">
                      Item builds coming soon! (Placeholder)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

       
        <button
          onClick={handleForfeit}
          className="w-full py-3 rounded-xl bg-cyan-700 hover:bg-red-800 text-white font-bold"
        >
          Forfeit (Clear All)
        </button>
      </div>
    </>
  );
}