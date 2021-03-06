/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

/**
 * Represents a health evaluation which describes the data and the algorithm
 * used by health manager to evaluate the health of an entity.
 *
 */
class HealthEvaluation {
  /**
   * Create a HealthEvaluation.
   * @property {string} [aggregatedHealthState] The health state of a Service
   * Fabric entity such as Cluster, Node, Application, Service, Partition,
   * Replica etc. Possible values include: 'Invalid', 'Ok', 'Warning', 'Error',
   * 'Unknown'
   * @property {string} [description] Description of the health evaluation,
   * which represents a summary of the evaluation process.
   * @property {string} kind Polymorphic Discriminator
   */
  constructor() {
  }

  /**
   * Defines the metadata of HealthEvaluation
   *
   * @returns {object} metadata of HealthEvaluation
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'HealthEvaluation',
      type: {
        name: 'Composite',
        polymorphicDiscriminator: {
          serializedName: 'Kind',
          clientName: 'kind'
        },
        uberParent: 'HealthEvaluation',
        className: 'HealthEvaluation',
        modelProperties: {
          aggregatedHealthState: {
            required: false,
            serializedName: 'AggregatedHealthState',
            type: {
              name: 'String'
            }
          },
          description: {
            required: false,
            serializedName: 'Description',
            type: {
              name: 'String'
            }
          },
          kind: {
            required: true,
            serializedName: 'Kind',
            isPolymorphicDiscriminator: true,
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = HealthEvaluation;
