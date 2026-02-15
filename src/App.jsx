import { useState } from 'react'
import './App.css'
import NucleotideDistributionChart from "./NucleotideDistributionChart.jsx";
import DonutChart from "react-donut-chart";
import AminoAcidDistributionChart from "./AminoAcidDistributionChart.jsx";
import ErrorSymbol from "./ErrorSymbol.jsx";
import Card from "./Card.jsx";
import DnaCodonTable from "./DnaCodonTable.js";
import RnaCodonTable from "./RnaCodonTable.js";


function listElementFreq(a){
    let c = a.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});

    let dupli = Object.entries(c)
        .filter(([key, value]) => value >=1)
        .map(([key, value]) => ({ codon: key, count: value }));
    return dupli;
}


function codonsArr(str){
    let threeMultipledStringLength=str.length-(str.length%3)
    let codonizedStr='';
    let num=3
    let groupsOf=num;
    for(let i=0;i<threeMultipledStringLength;i++){

        codonizedStr=codonizedStr+str[i];
        groupsOf--;
        if(groupsOf===0){
            codonizedStr=codonizedStr+'-';
            groupsOf=num;
        }

    }
    codonizedStr=codonizedStr.slice(0,-1)
    return codonizedStr;
}



function getBasesArr(strType,str){
    if(strType==='DNA') {
        let a_count = 0
        let t_count = 0
        let g_count = 0
        let c_count = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === 'A') {
                a_count++;
            } else if (str[i] === 'T') {
                t_count++;
            } else if (str[i] === 'G') {
                g_count++;
            } else if (str[i] === 'C') {
                c_count++;
            }
        }

        return [{base: 'A', count: a_count}, {base: 'T', count: t_count}, {base: 'G', count: g_count}, {
            base: 'C',
            count: c_count
        }]
    }else if(strType==='RNA') {
        let a_count = 0
        let u_count = 0
        let g_count = 0
        let c_count = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === 'A') {
                a_count++;
            } else if (str[i] === 'U') {
                u_count++;
            } else if (str[i] === 'G') {
                g_count++;
            } else if (str[i] === 'C') {
                c_count++;
            }
        }

        return [{base: 'A', count: a_count}, {base: 'U', count: u_count}, {base: 'G', count: g_count}, {
            base: 'C',
            count: c_count
        }]
    }else{
        return [{base: 'A', count: 0}, {base: 'U', count: 0}, {base: 'G', count: 0}, {
            base: 'C',
            count: 0
        }]
    }
}



function gcContent(arr){
    let a_count=arr[0].count;
    let tu_count=arr[1].count;
    let g_count=arr[2].count;
    let c_count=arr[3].count;
    return ((g_count+c_count)/(a_count+tu_count+g_count+c_count))*100;
}


function codonToAminoAcidSeq(codonArr, codonTable){

    let mainTable=codonTable;

    let proteinSeq='';
    for(let i=0;i<codonArr.length;i++){
        proteinSeq=proteinSeq+mainTable[codonArr[i]]+'-';
    }

    proteinSeq = proteinSeq.slice(0,-1);

    return proteinSeq;
}


function App() {

    const [inputValue, setInputValue] = useState('')
    const [seq, setSeq] = useState('')
    const [seqType, setSeqType] = useState('')

    const handleClick = () => {

        const cleaned = inputValue.toUpperCase().trim();

        if (cleaned.length === 0) {
            setSeqType('');
            setSeq('');
            return;
        }

        const hasInvalidChars = cleaned.split('').some(c => !'ATGCU'.includes(c));
        const hasT = cleaned.includes('T');
        const hasU = cleaned.includes('U');

        if (hasInvalidChars) {
            setSeqType('INVALID');
        } else if (hasT && hasU) {
            setSeqType('INVALID');
        } else if (hasU) {
            setSeqType('RNA');
        } else if (hasT) {
            setSeqType('DNA');
        } else {
            setSeqType('UNKNOWN');
        }

        setSeq(cleaned);
    }

    const handleInputChange=(e)=>{
        setInputValue(e.target.value)
    }

    return (
        <section className='page'>
            <div className='main-layout'>
                <header>
                    <div className='logo'>Sequence Analyzer</div>
                </header>

                <Card>
                    <label htmlFor='sequence-input-textarea' className='sequence-input-label'>Paste your sequence below:</label>
                    <textarea className='sequence-input-textarea' placeholder="Example: atcga..." name='sequence-input-textarea' rows='4' cols='40' value={inputValue} onChange={handleInputChange}/>
                    <div className='sequence-actions'>
                        <button className='analyze-btn' onClick={handleClick}>ANALYZE SEQUENCE</button>
                        <button className='clear-btn' onClick={()=>setInputValue('')}>CLEAR</button>
                    </div>
                </Card>

                {seqType === 'INVALID' && (
                    <Card className='error-card'>
                        <ErrorSymbol/>
                        <div>Invalid sequence! Your sequence contains characters other than A, T, G, C, U, or contains both T and U.</div>
                    </Card>
                )}

                {seqType === 'UNKNOWN' && (
                    <Card className='error-card'>
                        <ErrorSymbol/>
                        <div>Could not determine sequence type. Your sequence only contains A, G, C. Please specify if it is DNA or RNA with the inclusion of either T or U.</div>
                    </Card>
                )}

                {seq!=='' && (seqType==='DNA' || seqType==='RNA') && (
                    <div>
                        <div className='results-row'>
                            <div className='results-left-col'>

                                <Card className='sequence-type-card'>
                                    <div>We've identified your sequence as <span className='weighty-blue'>{seqType}</span></div>
                                </Card>

                                <Card className='complement-card'>
                                    <h4>{seqType===''?'':(seqType==='DNA'?'TRANSCRIPTED RNA':'REVERSE TRANSCRIPTED DNA')} SEQUENCE:</h4>
                                    <div className='complement-sequence'>{seqType==='DNA'?seq.replaceAll('T','U'):seq.replaceAll('U','T')}</div>
                                </Card>

                                <Card className='codon-and-amino-card'>
                                    <h4>CODON DATA:</h4>

                                    <div className='codon-and-amino-lengths'>
                                        <div>Number of full codons: {Math.floor(seq.length/3)}</div>
                                        <div>Number of unique codons: {seq.length<3?0:listElementFreq(codonsArr(seq).split('-')).length}</div>
                                        <div>Number of stop codons: {seqType==='DNA' && <span>{codonToAminoAcidSeq(codonsArr(seq).split('-'),DnaCodonTable).split('*').length - 1}</span>}
                                            {seqType==='RNA' && <span>{codonToAminoAcidSeq(codonsArr(seq).split('-'),RnaCodonTable).split('*').length - 1}</span>}
                                        </div>
                                    </div>
                                    <div className='codons-list'>{codonsArr(seq)}</div>

                                    <div className='table-wrapper'>
                                        <div className="table-header-row">
                                            <span className="table-header">unique codon</span>
                                            <span className="table-header">count</span>
                                        </div>
                                        <div className="table-contents unique-codon-list-contents">
                                            {seq.length >= 3 && listElementFreq(codonsArr(seq).split('-')).map((el) => (
                                                <div key={el.codon} className="table-row">
                                                    <span className="table-cell table-cell-base">{el.codon}</span>
                                                    <span className="table-cell table-cell-count">{el.count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </Card>

                            </div>

                            <div className='results-right-col'>
                                <Card className='nucleotide-stats-card'>
                                    <div className='nucleotide-stats-header'><h4>NUCLEOTIDE STATS:</h4></div>
                                    {seq.length>0 && <NucleotideDistributionChart dnaBases={getBasesArr(seqType,seq)}/>}
                                    <div className='sequence-length'>Sequence Length: {seq.length} nucleotides</div>
                                    <div className='base-counts'>
                                        {getBasesArr(seqType,seq).map(obj=>{
                                            return <div key={obj.base}>{obj.base}: {obj.count}</div>
                                        })}
                                    </div>
                                    <div className='gc-content-row'>
                                        <div>GC Content: <span className='weighty-blue'>{gcContent(getBasesArr(seqType,seq)).toFixed(2)}%</span></div>
                                    </div>
                                </Card>

                                <Card className='proteins-data-card'>
                                    <h4>PROTEIN DATA:</h4>

                                    <div className='table-wrapper'>
                                        <div className="table-header-row">
                                            <span className="table-header">codon</span>
                                            <span className="table-header">Amino Acid</span>
                                        </div>
                                        <div className="table-contents">
                                            {seq.length >= 3 && codonsArr(seq).split('-').map((el,i) => (
                                                <div key={i} className="table-row">
                                                    <span className="table-cell table-cell-base">{el}</span>
                                                    {seqType==='DNA' && <span className="table-cell table-cell-count">{DnaCodonTable[el]}</span>}
                                                    {seqType==='RNA' && <span className="table-cell table-cell-count">{RnaCodonTable[el]}</span>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="protein-sequence">
                                        {seq.length>=3 && (
                                            <span>
                                                {seqType==='DNA' && <span>{codonToAminoAcidSeq(codonsArr(seq).split('-'),DnaCodonTable)}</span>}
                                                {seqType==='RNA' && <span>{codonToAminoAcidSeq(codonsArr(seq).split('-'),RnaCodonTable)}</span>}
                                            </span>
                                        )}
                                    </div>
                                </Card>
                            </div>

                        </div>

                        <Card>
                            <h4 style={{paddingBottom:'10px'}}>AMINO ACID FREQUENCY DISTRIBUTION OF THE PROTEIN SEQUENCE:</h4>

                            {seqType==='DNA' && <AminoAcidDistributionChart codonData={listElementFreq(codonToAminoAcidSeq(codonsArr(seq).split('-'),DnaCodonTable).split('-').filter(el=>{
                                return el!=="*";
                            }))} />}
                            {seqType==='RNA' && <AminoAcidDistributionChart codonData={listElementFreq(codonToAminoAcidSeq(codonsArr(seq).split('-'),RnaCodonTable).split('-').filter(el=>{
                                return el!=="*";
                            }))} />}
                        </Card>
                    </div>
                )}

            </div>
        </section>
    )
}

export default App