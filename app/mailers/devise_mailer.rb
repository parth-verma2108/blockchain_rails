class DeviseMailer < Devise::Mailer
  # send password reset instructions
  def reset_password_instructions(record, token, opts = {})
    @resource = record
    @token = token
    mail(
      to: @resource.email,
      subject: "Reset password instructions",
      tag: 'password-reset',
      content_type: "text/html"
    ) do |format|
      format.html { render "devise_mailer/reset_password_instructions" }
    end
  end

  def set_password_instructions(record, token, opts = {})
    @resource = record
    @token = token
    mail(
      to: @resource.email,
      subject: "Set password instructions",
      tag: 'password-set',
      content_type: "text/html"
    ) do |format|
      format.html { render "devise_mailer/set_password_instructions" }
    end
  end
end