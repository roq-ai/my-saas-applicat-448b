import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createWorkoutPlan } from 'apiSdk/workout-plans';
import { Error } from 'components/error';
import { workoutPlanValidationSchema } from 'validationSchema/workout-plans';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ClientInterface } from 'interfaces/client';
import { UserInterface } from 'interfaces/user';
import { getClients } from 'apiSdk/clients';
import { getUsers } from 'apiSdk/users';
import { WorkoutPlanInterface } from 'interfaces/workout-plan';

function WorkoutPlanCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: WorkoutPlanInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createWorkoutPlan(values);
      resetForm();
      router.push('/workout-plans');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<WorkoutPlanInterface>({
    initialValues: {
      plan_data: '',
      client_id: (router.query.client_id as string) ?? null,
      personal_trainer_id: (router.query.personal_trainer_id as string) ?? null,
    },
    validationSchema: workoutPlanValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Workout Plan
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="plan_data" mb="4" isInvalid={!!formik.errors?.plan_data}>
            <FormLabel>Plan Data</FormLabel>
            <Input type="text" name="plan_data" value={formik.values?.plan_data} onChange={formik.handleChange} />
            {formik.errors.plan_data && <FormErrorMessage>{formik.errors?.plan_data}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<ClientInterface>
            formik={formik}
            name={'client_id'}
            label={'Select Client'}
            placeholder={'Select Client'}
            fetcher={getClients}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.fitness_goal}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'personal_trainer_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'workout_plan',
  operation: AccessOperationEnum.CREATE,
})(WorkoutPlanCreatePage);
