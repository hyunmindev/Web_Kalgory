<template>
  <v-form
    ref="form"
    class="mx-12"
    @submit.prevent="submit"
  >
    <email-text-field
      v-model="email"
      :tab-index="1"
      :is-focus="isEmailTextFieldFocus"
      :is-validate-on-blur="isEmailTextFieldValidateOnBlur"
      @input="isEmailTextFieldValidateOnBlur=true"
      @blur="isEmailTextFieldFocus=false"
      @focus="isEmailTextFieldFocus=true"
      @error="onEmailTextFieldError"
    />
    <password-text-field
      v-model="password"
      :tab-index="2"
      :is-focus="isPasswordTextFieldFocus"
      :is-validate-on-blur="isPasswordTextFieldValidateOnBlur"
      @input="isPasswordTextFieldValidateOnBlur=true"
      @blur="isPasswordTextFieldFocus=false"
      @focus="isPasswordTextFieldFocus=true"
      @error="onPasswordTextFieldError"
    />

    <v-btn
      tabindex="3"
      type="submit"
      :loading="isLoading"
      block
      class="mt-4"
      color="primary"
    >
      Sign in
    </v-btn>
  </v-form>
</template>

<script>
import EmailTextField from '@/components/auth/form/email/EmailTextField.vue';
import PasswordTextField from '@/components/auth/form/password/PasswordTextField.vue';
import { signInWithEmailAndPassword } from '@/plugins/firebase/auth';

export default {
  name: 'SignInForm',

  components: {
    EmailTextField,
    PasswordTextField,
  },

  data: () => ({
    isLoading: false,
    isEmailValid: false,
    isPasswordValid: false,
    isEmailTextFieldFocus: false,
    isPasswordTextFieldFocus: false,
    isEmailTextFieldValidateOnBlur: true,
    isPasswordTextFieldValidateOnBlur: true,
    email: '',
    password: '',
  }),

  computed: {
    isValid() {
      return this.$refs.form.validate();
    },
  },

  mounted() {
    this.isEmailTextFieldFocus = true;
  },

  methods: {
    onEmailTextFieldError(value) {
      this.isEmailValid = !value;
    },
    onPasswordTextFieldError(value) {
      this.isPasswordValid = !value;
    },
    submit() {
      this.isEmailTextFieldValidateOnBlur = false;
      this.isPasswordTextFieldValidateOnBlur = false;
      if (this.isValid) {
        this.$emit('ondStartLoad');
        this.isLoading = true;
        signInWithEmailAndPassword(this.email, this.password)
        // eslint-disable-next-line no-unused-vars
          .then((userCredential) => {
          })
          .catch((error) => {
            this.$toasted.global.error({ message: error.message });
          })
          .finally(() => {
            this.$emit('onEndLoad');
            this.isLoading = false;
          });
      } else if (!this.isEmailValid) {
        this.isEmailTextFieldFocus = true;
        this.$toasted.global.error({ message: '이메일이 유효하지 않습니다.' });
      } else if (!this.isPasswordValid) {
        this.isPasswordTextFieldFocus = true;
        this.$toasted.global.error({ message: '비밀번호가 유효하지 않습니다.' });
      } else {
        this.$toasted.global.error();
      }
    },
  },
};
</script>
