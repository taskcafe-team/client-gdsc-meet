export class Validator {
    static validateName({ name }: { name?: string }): string | null {
      if (name == null) {
        return null;
      }
      if (name.length === 0) {
        return 'Name cannot be blank';
      }
  
      return null;
    }
  
    static validateEmail({ email }: { email?: string |null}): string | null {
      if (email == null) {
        return null;
      }
      const emailRegExp = new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/
      );
        
      if (email.length === 0) {
        return 'Email cannot be blank !';
      } else if (!emailRegExp.test(email)) {
        return 'Please enter your correct email !';
      }
      
      return null;
    }
  
    static validatePassword({ password }: { password?: string |null}): string | null {
      if (password == null) {
        return null;
      }
      if (password.length === 0) {
        return 'Password can not be blank!';
      } else if (password.length < 6) {
        return 'Password needs at least 6 characters!';
      }
  
      return null;
    }
  
    static validateConfirmPassword({
      password,
      confirmPassword,
    }: {
      password?: string;
      confirmPassword?: string;
    }): string | null {
      if (confirmPassword == null) {
        return null;
      }
      if (confirmPassword.length === 0) {
        return 'Confirm Password can not be blank !';
      } else if (confirmPassword.length < 6) {
        return 'Password needs at least 6 characters !';
      } else if (password !== confirmPassword) {
        return 'The confirmation password is not the same as the password you entered!';
      }
  
      return null;
    }
  }
  