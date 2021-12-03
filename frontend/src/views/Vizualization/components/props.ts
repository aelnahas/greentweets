export enum VisualizationTypes {
  BARCHART ="bartchart",
  GEOMAP ="geomap",
  TREEMAP ="treemap",
  SCATTERCHART = "scatterchart"
}

export interface VisualizationProps {
  data: any[],
  dimension: string,
  metric: string,
  vizType: string
}