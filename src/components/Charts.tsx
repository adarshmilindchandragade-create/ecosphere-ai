export function TrendChart() {
  const values = [580, 560, 545, 515, 525, 480, 462];
  const points = values.map((v, i) => `${i * 60 + 18},${150 - (580 - v) * .55}`).join(' ');
  return <div className="trend-wrap" aria-label="Carbon footprint trend, down 12.4 percent">
    <svg viewBox="0 0 400 175" role="img" aria-hidden="true"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1e9b68" stopOpacity=".22"/><stop offset="1" stopColor="#1e9b68" stopOpacity="0"/></linearGradient></defs>
      {[32,72,112,152].map(y => <line key={y} x1="12" x2="388" y1={y} y2={y} stroke="#e7ece6" strokeDasharray="3 5"/>)}
      <polygon points={`18,160 ${points} 378,160`} fill="url(#area)"/><polyline points={points} fill="none" stroke="#12825a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      {values.map((v, i) => <circle key={v} cx={i * 60 + 18} cy={150 - (580 - v) * .55} r={i === 6 ? 5 : 3} fill={i === 6 ? '#fff' : '#12825a'} stroke="#12825a" strokeWidth="2"/>)}
    </svg><div className="chart-labels"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span></div>
  </div>;
}
export function DonutChart() {
  return <div className="donut-shell" role="img" aria-label="Emissions: transport 41 percent, home 27 percent, food 22 percent, other 10 percent"><div className="donut"><div><strong>462</strong><span>kg CO₂e</span></div></div><div className="legend"><span><i className="transport"/>Transport <b>41%</b></span><span><i className="home"/>Home energy <b>27%</b></span><span><i className="food"/>Food <b>22%</b></span><span><i className="other"/>Other <b>10%</b></span></div></div>;
}
