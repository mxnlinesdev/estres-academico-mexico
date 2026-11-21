About Dataset

Student Early Stress & Academic Distress Detection Dataset
A 289,161-Record Benchmark for Academic Early Warning, Well-being & Mental Health Triage

📌 1. Context & Problem Statement

Students experiencing severe academic distress, exam anxiety, fear of failure, or acute emotional burnout rarely reach out for institutional support before it is too late.
According to the National Crime Records Bureau (ADSI 2023), India recorded 13,892 student suicides in a single year (~8.1% of all national suicides), with examination failure and academic distress cited among the primary recorded drivers.

Colleges have thousands of students and limited counselling resources.
This dataset provides a machine learning benchmark designed to predict early warning signals weeks before failure occurs by analyzing:

Academic signals: Marks, grade trajectories, pass rates, missed submissions.

Behavioral & LMS engagement: VLE daily clicks, inactivity gaps, engagement decay, submission lateness.

Psychological & lifestyle factors: Anxiety, depression, perceived study workload, sleep quality, and social support.

📊 2. Dataset Overview
Total Records: 289,161 students
Total Features: 39 curated, standardized attributes
Missing Values: Exactly 0 (fully validated and imputed)
Target Balance (at_risk): 53.48% Safe ($0$) vs. 46.52% At-Risk
($1$)

Core Feature Groups:
Demographics & Socioeconomic: age, gender_encoded, disability_flag, international_student, first_generation, socioeconomic_deprivation_index (1–10).
Academic Momentum: admission_grade, prior_qualification_grade, study_load, study_hours_per_week, gpa_score_avg (0–100%), gpa_score_trend (semester-over-semester slope), pass_rate, first_assessment_score.

Behavioral & LMS Engagement: attendance_rate, lms_engagement_score, lms_active_days_ratio, engagement_trend, longest_inactivity_gap_days, submission_lateness_days, missed_submissions_count.

Psychological & Social (Track 2): stress_level_scale (0–10), anxiety_score (0–10), depression_score (0–10), burnout_score (0–10), sleep_hours_per_day, social_support_score, academic_pressure_score, extracurricular_participation.

Supervised Learning Targets:
at_risk: Binary classification (0: Safe/Pass/Graduate, 1: Academic Failure/Dropout/High Distress).
stress_level_3class: Multi-class classification (0: Low, 1: Medium, 2: High Stress).
final_score_pct: Continuous regression (0 to 100% expected academic outcome).
needs_help_score: Continuous composite risk index (0.00 to 1.00) combining academic and stress probabilities.
needs_help_band: Operational triage bands (Green, Amber, Red) for counsellor prioritization.

💡 3. Research & Inspiration Questions
How early in the semester can machine learning detect students who will fail or withdraw?

What is the predictive impact of a falling GPA slope (gpa_score_trend < 0) versus static admission marks?
How strongly do sleep deprivation and anxiety interact with academic workload in triggering academic failure?
Can unsupervised clustering segment students into actionable behavioral archetypes ("steady performers", "late starters", "fading out", "high stress / low support")?

🏛️ 4. Provenance & Upstream Acknowledgements
This benchmark was harmonized from 6 open academic and survey
repositories:

Open University Learning Analytics Dataset (OULAD) — Kuzilek et
al., Open University, CC BY 4.0
Predict Students' Dropout and Academic Success — UCI Machine
Learning Repository (ID 697), Realinho et al., CC BY 4.0
Student Performance Dataset — UCI Machine Learning Repository (ID
320), Cortez & Silva, CC BY 4.0
Student Stress Factors: A Comprehensive Analysis — Kaggle rxnach
Student Mental Health and Burnout Dataset — Kaggle / Hyper.ai
Student Academic Performance & Dropout Risk 2026 — Mohan Krishna
Thalla

📜 5. License
This dataset is distributed under the Creative Commons Attribution 4.0 International (CC BY 4.0) license.