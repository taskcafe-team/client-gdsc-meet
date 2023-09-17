export class Validator {
    static validateName({ name }: { name?: string }): string | null {
      if (name == null) {
        return null;
      }
      if (name.length === 0) {
        return 'Tên không được để trống';
      }
  
      return null;
    }
  
    static validateEmail({ email }: { email?: string }): string | null {
      if (email == null) {
        return null;
      }
      const emailRegExp = new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$/
      );
  
      if (email.length === 0) {
        return 'Email không được để trống';
      } else if (!emailRegExp.test(email)) {
        return 'Vui lòng nhập đúng email của bạn!';
      }
  
      return null;
    }
  
    static validatePassword({ password }: { password?: string }): string | null {
      if (password == null) {
        return null;
      }
      if (password.length === 0) {
        return 'Mật khẩu không được để trống!';
      } else if (password.length < 6) {
        return 'Mật khẩu cần ít nhất 6 kí tự!';
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
        return 'Mật khẩu không được để trống!';
      } else if (confirmPassword.length < 6) {
        return 'Mật khẩu cần ít nhất 6 kí tự!';
      } else if (password !== confirmPassword) {
        return 'Mật khẩu xác nhận không giống với mật khẩu bạn đã nhập!';
      }
  
      return null;
    }
  }
  