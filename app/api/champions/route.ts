import { NextResponse } from 'next/server';

export async function GET() {

  const versions = await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then(r => r.json());
  const version = versions[0];
  const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`);
  const data = await res.json();
  const champs = Object.values(data.data).map((champ: any) => ({
    id: champ.id,
    name: champ.name,
    icon: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`,
  }));
  return NextResponse.json({ version, champs });
}