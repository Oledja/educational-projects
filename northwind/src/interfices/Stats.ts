type CustomLog = {
  duration: number;
  query: string;
};

interface Stats {
  log: CustomLog[];
  queries: number;
  results: number;
  select?: number;
  selectLeftJoin?: number;
  selectWhere?: number;
}

export default Stats;
