export type Item = {
  name: string;
  icon: string;  
  type: 'AD' | 'AP' | 'Tank' | 'Utility';
  role: 'Tank' | 'Mage' | 'Support' | 'Assassin' | 'Fighter' | 'Marksman';
};

export type Champion = {
  name: string;
  class: 'Support' | 'Tank' | 'Mage' | 'Assassin' | 'Fighter' | 'Marksman';
  type: 'Melee' | 'Hook' | 'Enchanter' | 'Mage' | 'Tank' | 'Assassin';
  bestItems: {
    AD: Item[];
    AP: Item[];
    Tank?: Item[];
    Utility?: Item[];
  };
  icon: string; 
};

export const champions: Champion[] = [
  {
    name: 'Sona',
    class: 'Support',
    type: 'Enchanter',
    icon: 'https://ddragon.leagueoflegends.com/cdn/13.14.1/img/champion/Sona.png',
    bestItems: {
      AD: [],
      AP: [
        {
          name: 'Ardent Censer',
          icon: 'https://ddragon.leagueoflegends.com/cdn/13.14.1/img/item/3504.png',
          type: 'Utility',
          role: 'Support',
        },
        {
          name: 'Moonstone Renewer',
          icon: 'https://ddragon.leagueoflegends.com/cdn/13.14.1/img/item/6617.png',
          type: 'Utility',
          role: 'Support',
        },
      ],
    },
  },
  {
    name: 'Senna',
    class: 'Support',
    type: 'Marksman',
    icon: 'https://ddragon.leagueoflegends.com/cdn/13.14.1/img/champion/Senna.png',
    bestItems: {
      AD: [
        {
          name: 'Galeforce',
          icon: 'https://ddragon.leagueoflegends.com/cdn/13.14.1/img/item/6671.png',
          type: 'AD',
          role: 'Marksman',
        },
        {
          name: 'Kraken Slayer',
          icon: 'https://ddragon.leagueoflegends.com/cdn/13.14.1/img/item/6672.png',
          type: 'AD',
          role: 'Marksman',
        },
      ],
      AP: [],
    },
  },
  {
    name: 'Blitzcrank',
    class: 'Support',
    type: 'Hook',
    icon: 'https://ddragon.leagueoflegends.com/cdn/13.14.1/img/champion/Blitzcrank.png',
    bestItems: {
      AD: [
        {
          name: 'Black Cleaver',
          icon: 'https://ddragon.leagueoflegends.com/cdn/13.14.1/img/item/3071.png',
          type: 'AD',
          role: 'Fighter',
        },
      ],
      AP: [],
    },
  },
  {
    name: 'Rell',
    class: 'Support',
    type: 'Tank',
    icon: 'https://ddragon.leagueoflegends.com/cdn/13.14.1/img/champion/Rell.png',
    bestItems: {
      AD: [],
      AP: [],
      Tank: [
        {
          name: 'Locket of the Iron Solari',
          icon: 'https://ddragon.leagueoflegends.com/cdn/13.14.1/img/item/3190.png',
          type: 'Tank',
          role: 'Support',
        },
        {
          name: 'Knight\'s Vow',
          icon: 'https://ddragon.leagueoflegends.com/cdn/13.14.1/img/item/3105.png',
          type: 'Tank',
          role: 'Support',
        },
      ],
    },
  },
];