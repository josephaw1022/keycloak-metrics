/**
 * Represents a HelpLine with a description explaining the purpose or meaning
 * of the associated MetricGroup.
 */
export interface HelpLine {
  /** Description of the metric group */
  description: string;
}

/**
 * Represents a TypeLine specifying the type of the associated MetricGroup.
 */
export interface TypeLine {
  /** Type of the metric, typically one of "counter", "gauge", "histogram", or "summary" */
  type: string;
}

/**
 * Represents a group of related metrics, consisting of a name, help line, type line,
 * and one or more value lines.
 */
export interface MetricGroup {
  /** Name of the metric group, used as a prefix for its metrics */
  name: string;
  /** HelpLine providing a description of the metric group */
  helpLine: HelpLine;
  /** TypeLine specifying the type of metric group */
  typeLine: TypeLine;
  /** Array of ValueLines representing individual metric values within the group */
  valueLines: ValueLine[];
}

/**
 * Represents a ValueLine within a MetricGroup, consisting of an optional array of labels
 * and a value. The value can be either a number or a string.
 */
export interface ValueLine {
  /** Optional array of labels providing additional dimensions for the metric value */
  labels?: Label[];
  /** Value of the metric, which can be either a number or a string */
  endValue?: number | string;
}

/**
 * Represents a Label providing an additional dimension to a metric value within a ValueLine.
 */
export interface Label {
  /** Key of the label, representing the name or identifier of the dimension */
  key: string | undefined;
  /** Value of the label, representing the specific attribute of the dimension */
  value: string | undefined;
}
