DELETE FROM decision_alternatives_criterion_values;
DELETE FROM alternatives_comparisons;
DELETE FROM criteria_comparisons;
DELETE FROM decision_alternatives;
DELETE FROM decision_criteria;
DELETE FROM decision_participant;
DELETE FROM decision;

ALTER TABLE alternatives_comparisons AUTO_INCREMENT = 1;
ALTER TABLE criteria_comparisons AUTO_INCREMENT = 1;
ALTER TABLE decision_participant AUTO_INCREMENT = 1;
ALTER TABLE decision_criteria AUTO_INCREMENT = 1;
ALTER TABLE decision_alternatives_criterion_values AUTO_INCREMENT = 1;
ALTER TABLE decision_alternatives AUTO_INCREMENT = 1;
ALTER TABLE decision AUTO_INCREMENT = 1;