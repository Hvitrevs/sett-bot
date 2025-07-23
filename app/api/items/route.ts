import { NextResponse } from 'next/server';

export async function GET() {
  const versions = await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then(r => r.json());
  const version = versions[0];
  const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`);
  const data = await res.json();
  const items = Object.entries(data.data).map(([id, item]: any) => ({
    id,
    name: item.name,
    icon: `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`,
  }));
  return NextResponse.json({ version, items });
}