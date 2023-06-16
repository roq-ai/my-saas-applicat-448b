import * as yup from 'yup';

export const workoutPlanValidationSchema = yup.object().shape({
  plan_data: yup.string().required(),
  client_id: yup.string().nullable(),
  personal_trainer_id: yup.string().nullable(),
});
