import { useState, useEffect } from "react";
import music1 from "../music/music1.mp3";
import music2 from "../music/music2.mp3";
import m3 from "../music/New_Song___O_Maahi_O_Maahi___Akshay_Kumar___Ananya_Pandey___New_Hindi_Song___New_Song_2025(256k).mp3";
import m4 from "../music/Tu_Mera_Naseeb_Tha(256k).mp3";
import m5 from "../music/Rula_Ke_Gaya_Ishq___Bhavin,_Sameeksha,_Vishal___Stebin_Ben,_Sunny-Inder,_Kumaar__Zee_Music_Originals(256k).mp3";
import m6 from "../music/Sanam_Aa_Gaya_Song___Payal_Dev___Stebin_Ben___Kunaal_Vermaa___Rubina_Dilaik,_Abhinav___New_Love_Song(256k).mp3";
import m7 from "../music/Tera_Hi_Rahunga___New_Hindi_Song___Romantic_Song___Love_Song___New_Song_2025___Romantic0pia(256k).mp3";
import m8 from "../music/Tere_Bina_Nind_Nahi_Aati_-_Official_Video___Letest_Trending_Bollywood_Song___New_Romantic_Song_2025(256k).mp3";
import m9 from "../music/Tere_Dil_Pe_Haq_Mera_Hai___Romantic_Song_love_vibes__Presented_by_Nova_Tunes(256k).mp3";
import m10 from "../music/Teri_Kaynat_Mere_Khali_Hath__Full_Video__Faheem_Abdullah___Dhanush,_Kriti_Sanon___Awara_Angara_Song(256k).mp3";
const useUploder = () => {
  const [songsDB, setSongDB] = useState([]);

  const defaultSongs = [
    {
      name: "Ocean_Relaxing_Music.mp3",
      type: "audio/mpeg",
      size: 5856,
      url: music1,
      lastModified: 647896,
      date: new Date()
    },
    {
      name: "Lofi_Relaxing_Song_2026.mp3",
      type: "audio/mpeg",
      size: 8653,
      url: music2,
      lastModified: 8685338,
      date: new Date()
    },
    {
      name: "New_Song___O_Maahi_O_Maahi___Akshay_Kumar___Ananya_Pandey___New_Hindi_Song___New_Song_2025(256k).mp3",
      type: "audio/mpeg",
      url: m3
    },
    {
      name: "Tu_Mera_Naseeb_Tha(256k).mp3",
      type: "audio/mpeg",
      url: m4
    },
    {
      name: "Rula_Ke_Gaya_Ishq___Bhavin,_Sameeksha,_Vishal___Stebin_Ben,_Sunny-Inder,_Kumaar__Zee_Music_Originals(256k).mp3",
      type: "audio/mpeg",
      url: m5
    },
    {
      name: "Sanam_Aa_Gaya_Song___Payal_Dev___Stebin_Ben___Kunaal_Vermaa___Rubina_Dilaik,_Abhinav___New_Love_Song(256k).mp3",
      type: "audio/mpeg",
      url: m6
    },
    {
      name: "Tera_Hi_Rahunga___New_Hindi_Song___Romantic_Song___Love_Song___New_Song_2025___Romantic0pia(256k).mp3",
      type: "audio/mpeg",
      url: m7
    },
    {
      name: "Tere_Bina_Nind_Nahi_Aati_-_Official_Video___Letest_Trending_Bollywood_Song___New_Romantic_Song_2025(256k).mp3",
      type: "audio/mpeg",
      url: m8
    },
    {
      name: "Tere_Dil_Pe_Haq_Mera_Hai___Romantic_Song_love_vibes__Presented_by_Nova_Tunes(256k).mp3",
      type: "audio/mpeg",
      url: m9
    },
    {
      name: "Teri_Kaynat_Mere_Khali_Hath__Full_Video__Faheem_Abdullah___Dhanush,_Kriti_Sanon___Awara_Angara_Song(256k).mp3",
      type: "audio/mpeg",
      url: m10
    }
  ];

  useEffect(() => {
    setSongDB(defaultSongs)
  }, []);

  const upload = (e) => {
    let files = Array.from(e.target.files);

    files.forEach((element) => {
      let exists = songsDB.some(
        (ele) =>
          ele.size === element.size &&
          ele.name === element.name
      );

      if (exists) return;

      let file = {
        name: element.name,
        type: element.type,
        size: element.size,
        url: URL.createObjectURL(element),
        lastModified: element.lastModified,
      };

      setSongDB((pre) => [...pre, file]);
    });
  };

  return { songsDB, upload };
};

export default useUploder;