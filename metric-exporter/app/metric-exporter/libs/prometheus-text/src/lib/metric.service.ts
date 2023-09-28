import { Injectable } from '@nestjs/common';
import { MetricGroup, Label, ValueLine } from './metric.interface';

/**
 * A service for creating metric lines based on given metric groups
 */
@Injectable()
export class MetricService {
  /**
   * Create metric lines from a given metric group
   * @param {MetricGroup} metricGroup - The metric group to create lines from
   * @returns {string} The created metric lines as a string
   */
  public createMetricLines(metricGroup: MetricGroup): string {
    let metricLines = ``;
    metricLines += this.createHelpLine(metricGroup);
    metricLines += this.createTypeLine(metricGroup);
    metricLines += this.createValueLines(metricGroup);

    return metricLines;
  }

  /**
   * Create a help line from a given metric group
   * @param {MetricGroup} metricGroup - The metric group to create the help line from
   * @returns {string} The created help line as a string
   */
  private createHelpLine(metricGroup: MetricGroup): string {
    return `# HELP ${metricGroup.name} ${metricGroup.helpLine.description}\n`;
  }

  /**
   * Create a type line from a given metric group
   * @param {MetricGroup} metricGroup - The metric group to create the type line from
   * @returns {string} The created type line as a string
   */
  private createTypeLine(metricGroup: MetricGroup): string {
    return `# TYPE ${metricGroup.name} ${metricGroup.typeLine.type}\n`;
  }

  /**
   * Create value lines from a given metric group
   * @param {MetricGroup} metricGroup - The metric group to create value lines from
   * @returns {string} The created value lines as a string
   */
  private createValueLines(metricGroup: MetricGroup): string {
    let valueLines = ``;
    metricGroup.valueLines.forEach((valueLine) => {
      valueLines += `${this.createValueLine(metricGroup, valueLine)}\n`;
    });
    valueLines += `\n\n`;
    return valueLines;
  }

  /**
   * Create a value line from a given metric group and value line
   * @param {MetricGroup} metricGroup - The metric group to create the value line from
   * @param {ValueLine} valueLine - The value line to create the value line from
   * @returns {string} The created value line as a string
   */
  private createValueLine(
    metricGroup: MetricGroup,
    valueLine: ValueLine
  ): string {
    let valueLineString = `${metricGroup.name}`;
    if (valueLine.labels) {
      valueLineString += `{${this.createLabelString(valueLine.labels)}}`;
    }

    let endPart = valueLine.endValue ? ` ${valueLine.endValue}` : ` 0`;
    endPart = endPart.replace('null', '0');
    valueLineString += endPart;

    return valueLineString;
  }

  /**
   * Create a label string from given labels
   * @param {Label[]} labels - The labels to create the string from
   * @returns {string} The created label string
   */
  private createLabelString(labels: Label[]): string {
    let labelString = ``;
    labels.forEach((label, index) => {
      labelString += `${label.key}="${label.value}"${
        index < labels.length - 1 ? `,` : ``
      }`;
    });
    return labelString.slice(0);
  }
}
