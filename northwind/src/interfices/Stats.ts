interface Stats {
  log: string[];
  queries: number;
  results: number;
  select?: number;
  selectLeftJoin?: number;
  selectWhere?: number;
}

export default Stats;
