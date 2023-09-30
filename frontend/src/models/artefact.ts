import { Analysis } from "./analysis";

export class Artefact{
    id: number;
    slika: string;
    opisIspodSlike: string;
    duzina: number;
    sirina: number;
    visina: number;
    precnik: number;
    debljina: number;
    tezina: number;
    opisArtefakta: string;
    analogije: string;
    materijal: string;
    opisUzorka: string;
    sirovina: string;
    arheoloskiLokalitetIskopavanja: string;
    muzej: string
    inventarskiBroj: string
    relativnoDatovanje: string
    apsolutnoDatovanje:  string;
    kontekst: string;
    x: number;
    y: number;
    z: number;
    XRF: Array<Analysis>;
    XRD: Array<Analysis>;
    XS: Array<Analysis>;
    OSL: Array<Analysis>;
    pdfs: Array<String>;
    links: Array<String>;
}