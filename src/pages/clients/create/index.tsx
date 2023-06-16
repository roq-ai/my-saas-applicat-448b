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
import { createClient } from 'apiSdk/clients';
import { Error } from 'components/error';
import { clientValidationSchema } from 'validationSchema/clients';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { ClientInterface } from 'interfaces/client';

function ClientCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ClientInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createClient(values);
      resetForm();
      router.push('/clients');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ClientInterface>({
    initialValues: {
      fitness_goal: '',
      preferences: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: clientValidationSchema,
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
            Create Client
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="fitness_goal" mb="4" isInvalid={!!formik.errors?.fitness_goal}>
            <FormLabel>Fitness Goal</FormLabel>
            <Input type="text" name="fitness_goal" value={formik.values?.fitness_goal} onChange={formik.handleChange} />
            {formik.errors.fitness_goal && <FormErrorMessage>{formik.errors?.fitness_goal}</FormErrorMessage>}
          </FormControl>
          <FormControl id="preferences" mb="4" isInvalid={!!formik.errors?.preferences}>
            <FormLabel>Preferences</FormLabel>
            <Input type="text" name="preferences" value={formik.values?.preferences} onChange={formik.handleChange} />
            {formik.errors.preferences && <FormErrorMessage>{formik.errors?.preferences}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
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
  entity: 'client',
  operation: AccessOperationEnum.CREATE,
})(ClientCreatePage);
