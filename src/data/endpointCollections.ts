import type { EndpointCollection } from '../shared/types/endpoint'
import { createAccountDocumentation } from './documentation/account/createAccount'
import { createAccountGoogleDocumentation } from './documentation/account/createAccountGoogle'
import { getPreferencesDocumentation } from './documentation/preferences/getPreferences'
import { updatePreferencesDocumentation } from './documentation/preferences/updatePreferences'
import { createAvatarUploadUrlDocumentation } from './documentation/profile/createAvatarUploadUrl'
import { changePasswordDocumentation } from './documentation/profile/changePassword'
import { deleteAvatarDocumentation } from './documentation/profile/deleteAvatar'
import { getProfileDocumentation } from './documentation/profile/getProfile'
import { uploadAvatarDocumentation } from './documentation/profile/uploadAvatar'
import { loginDocumentation } from './documentation/authentication/login'
import { logoutDocumentation } from './documentation/authentication/logout'
import { refreshTokenDocumentation } from './documentation/authentication/refreshToken'
import { validateSocialLoginDocumentation } from './documentation/authentication/validateSocialLogin'
import { generateCodeDocumentation } from './documentation/security/generateCode'
import { deleteDeviceDocumentation } from './documentation/security/deleteDevice'
import { confirmMfaDocumentation } from './documentation/security/confirmMfa'
import { disableMfaMethodDocumentation } from './documentation/security/disableMfaMethod'
import { disableMfaDocumentation } from './documentation/security/disableMfa'
import { enableMfaMethodDocumentation } from './documentation/security/enableMfaMethod'
import { securityListDevicesDocumentation } from './documentation/security/listDevices'
import { listMfaMethodsDocumentation } from './documentation/security/listMfaMethods'
import { mfaStatusDocumentation } from './documentation/security/mfaStatus'
import { requestPasswordResetDocumentation } from './documentation/security/requestPasswordReset'
import { validatePasswordResetDocumentation } from './documentation/security/validatePasswordReset'
import { completePasswordResetDocumentation } from './documentation/security/completePasswordReset'
import { startMfaDocumentation } from './documentation/security/startMfa'
import { securityVerifyDeviceDocumentation } from './documentation/security/verifyDevice'
import { verifyCodeDocumentation } from './documentation/security/verifyCode'

export const endpointCollections: EndpointCollection[] = [
  {
    id: 'authentication',
    name: 'Authentication',
    icon: 'lock',
    endpoints: [
      {
        id: 'login',
        name: 'Login',
        method: 'POST',
        path: '/api/v1/auth/login',
        description: 'Autentica um utilizador com e-mail e palavra-passe.',
        documentation: loginDocumentation,
        requestBody: '{\n  "type": "EMAIL",\n  "identifier": "exemplo@gmail.com",\n  "password": "MinhaSenha@2026",\n  "publicKey": "{{public_key_clean}}",\n  "trustThisDevice": true\n}',
        response: {
          success: true,
          data: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            refresh_token: 'def50200a8f41c2f...',
            expires_in: 3600,
            user: { id: 'usr_9c3a1', name: 'Ana Martins', email: 'developer@company.com' },
          },
        },
      },
      {
        id: 'logout',
        name: 'Logout',
        method: 'POST',
        path: '/api/v1/auth/logout',
        description: 'Encerra a sessão atual e revoga o token.',
        documentation: logoutDocumentation,
        response: { success: true, message: 'Session closed' },
      },
      {
        id: 'refresh-token',
        name: 'Refresh token',
        method: 'POST',
        path: '/api/v1/auth/refresh',
        description: 'Gera um novo access token a partir de um refresh token.',
        documentation: refreshTokenDocumentation,
        requestBody: '{\n  "refreshToken": "{{refreshToken}}"\n}',
        response: { access_token: 'eyJhbGciOiJIUzI1NiJ9...', expires_in: 3600 },
      },
    ],
    groups: [
      {
        id: 'social',
        name: 'Social',
        endpoints: [
          {
            id: 'validate-social-login',
            name: 'Login com Google',
            method: 'POST',
            path: '/api/v1/auth/social/google',
            description: 'Valida e conclui uma autenticação através do Google.',
            documentation: validateSocialLoginDocumentation,
            requestBody: '{\n  "idToken": ""\n}',
            response: {},
          },
        ],
      },
    ],
  },
  {
    id: 'account',
    name: 'Conta',
    icon: 'users',
    endpoints: [
      {
        id: 'create-account',
        name: 'Criar conta',
        method: 'POST',
        path: '/api/v1/me/account/create',
        description: 'Cria uma nova conta de utilizador.',
        documentation: createAccountDocumentation,
        requestBody: '{\n  "firstName": "Manuel",\n  "lastName": "Muanza",\n  "identifierType": "EMAIL",\n  "identifier": "exemplo@gmail.com",\n  "password": "MinhaSenha@2026"\n}',
        response: {},
      },
      {
        id: 'create-account-google',
        name: 'Criar conta com Google',
        method: 'POST',
        path: '/api/v1/me/account/social/google',
        description: 'Cria uma nova conta através da autenticação Google.',
        documentation: createAccountGoogleDocumentation,
        requestBody: '{\n  "idToken": ""\n}',
        response: {},
      },
    ],
  },
  {
    id: 'profile',
    name: 'Perfil',
    icon: 'users',
    endpoints: [
      {
        id: 'get-profile',
        name: 'Ver dados do perfil',
        method: 'GET',
        path: '/api/v1/me/profile',
        description: 'Consulta os dados do perfil do utilizador.',
        documentation: getProfileDocumentation,
        response: {},
      },
    ],
    groups: [
      {
        id: 'manage-profile-photo',
        name: 'Gerir Foto de Perfil',
        endpoints: [
          {
            id: 'create-avatar-upload-url',
            name: 'Gerar URL temporária',
            method: 'POST',
            path: '/api/v1/me/avatar/upload-url',
            description: 'Gera uma URL temporária para enviar a foto de perfil.',
            documentation: createAvatarUploadUrlDocumentation,
            requestBody: '{\n  "contentType": "image/png",\n  "size": 120000\n}',
            response: {},
          },
          {
            id: 'upload-avatar',
            name: 'Upload Foto',
            method: 'PUT',
            path: '{{uploadUrl}}',
            description: 'Envia a imagem para a URL temporária da AWS.',
            documentation: uploadAvatarDocumentation,
            bodyType: 'binary',
            response: {},
          },
          {
            id: 'delete-avatar',
            name: 'Remover imagem',
            method: 'DELETE',
            path: '/api/v1/me/avatar',
            description: 'Remove a foto de perfil do utilizador.',
            documentation: deleteAvatarDocumentation,
            response: {},
          },
        ],
      },
      {
        id: 'change-password',
        name: 'Mudar Senha',
        endpoints: [
          {
            id: 'update-password',
            name: 'Atualizar senha',
            method: 'PUT',
            path: '/api/v1/me/password',
            description: 'Altera a palavra-passe do utilizador autenticado.',
            documentation: changePasswordDocumentation,
            requestBody: '{\n  "currentPassword": "MinhaSenha@2026",\n  "newPassword": "NovaSenha@2026",\n  "confirmPassword": "NovaSenha@2026"\n}',
            response: {},
          },
        ],
      },
    ],
  },
  {
    id: 'preferences',
    name: 'Preferências',
    icon: 'preferences',
    endpoints: [
      {
        id: 'update-preferences',
        name: 'Atualizar preferências',
        method: 'PUT',
        path: '/api/v1/me/preferences',
        description: 'Atualiza as preferências do utilizador.',
        documentation: updatePreferencesDocumentation,
        requestBody: '{\n  "emailNotificationsEnabled": true,\n  "smsNotificationsEnabled": false,\n  "theme": "DARK",\n  "language": "en-us"\n}',
        response: {},
      },
      {
        id: 'get-preferences',
        name: 'Ver preferências',
        method: 'GET',
        path: '/api/v1/me/preferences',
        description: 'Consulta as preferências atuais do utilizador.',
        documentation: getPreferencesDocumentation,
        response: {},
      },
    ],
  },
  {
    id: 'security',
    name: 'Segurança',
    icon: 'lock',
    endpoints: [],
    groups: [
      {
        id: 'verifications',
        name: 'Verificações',
        endpoints: [
          {
            id: 'send-verification-code',
            name: 'Enviar código',
            method: 'POST',
            path: '/api/v1/verifications/{{verificationToken}}/codes',
            description: 'Gera ou reenvia um código de verificação.',
            documentation: generateCodeDocumentation,
            requestBody: '{\n  "method": "EMAIL"\n}',
            response: {},
          },
          {
            id: 'verify-verification-code',
            name: 'Verificar código',
            method: 'POST',
            path: '/api/v1/verifications/{{verificationToken}}/verify',
            description: 'Valida um código de verificação.',
            documentation: verifyCodeDocumentation,
            requestBody: '{\n  "method": "EMAIL",\n  "code": "710373"\n}',
            response: {},
          },
        ],
      },
      {
        id: 'mfa',
        name: 'MFA App Autenticador',
        endpoints: [
          {
            id: 'start-mfa',
            name: 'Start Setting MFA',
            method: 'POST',
            path: '/api/v1/mfa/start',
            description: 'Inicia a configuração da autenticação multifator.',
            documentation: startMfaDocumentation,
            response: {},
          },
          {
            id: 'confirm-mfa',
            name: 'Confirm MFA',
            method: 'POST',
            path: '/api/v1/mfa/confirm',
            description: 'Confirma e ativa a configuração MFA.',
            documentation: confirmMfaDocumentation,
            response: {},
          },
          {
            id: 'mfa-status',
            name: 'Ver estado do MFA',
            method: 'GET',
            path: '/api/v1/mfa/status',
            description: 'Consulta o estado do MFA do utilizador.',
            documentation: mfaStatusDocumentation,
            response: {},
          },
          {
            id: 'disable-mfa',
            name: 'Desativar MFA',
            method: 'POST',
            path: '/api/v1/mfa/disable',
            description: 'Desativa o MFA após validação por TOTP.',
            documentation: disableMfaDocumentation,
            response: {},
          },
        ],
      },
      {
        id: 'mfa-methods',
        name: 'MFA Métodos',
        endpoints: [
          {
            id: 'enable-mfa-method',
            name: 'Ativar método',
            method: 'POST',
            path: '/api/v1/mfa/methods/me',
            description: 'Ativa um método de verificação para o utilizador.',
            documentation: enableMfaMethodDocumentation,
            requestBody: '{\n  "method": "EMAIL"\n}',
            response: {},
          },
          {
            id: 'disable-mfa-method',
            name: 'Desativar método',
            method: 'DELETE',
            path: '/api/v1/mfa/methods/me',
            description: 'Desativa um método de verificação do utilizador.',
            documentation: disableMfaMethodDocumentation,
            requestBody: '{\n  "method": "EMAIL"\n}',
            response: {},
          },
          {
            id: 'list-mfa-methods',
            name: 'Listar métodos',
            method: 'GET',
            path: '/api/v1/mfa/methods/me',
            description: 'Lista os métodos de verificação do utilizador.',
            documentation: listMfaMethodsDocumentation,
            response: {},
          },
        ],
      },
      {
        id: 'password-reset',
        name: 'Repor Senha',
        endpoints: [
          {
            id: 'request-password-reset',
            name: 'Solicitar reposição',
            method: 'POST',
            path: '/api/v1/auth/password/reset/request',
            description: 'Inicia o processo de reposição da palavra-passe.',
            documentation: requestPasswordResetDocumentation,
            requestBody: '{\n  "fullName": "Manuel Muanza",\n  "email": "exemplo@gmail.com"\n}',
            response: {},
          },
          {
            id: 'validate-password-reset',
            name: 'Validar operação',
            method: 'GET',
            path: '/api/v1/auth/password/reset/{{resetToken}}',
            description: 'Valida uma operação de reposição da palavra-passe.',
            documentation: validatePasswordResetDocumentation,
            response: {},
          },
          {
            id: 'complete-password-reset',
            name: 'Mudar senha',
            method: 'PATCH',
            path: '/api/v1/auth/password/reset/{{resetToken}}',
            description: 'Define uma nova palavra-passe para a conta.',
            documentation: completePasswordResetDocumentation,
            requestBody: '{\n  "newPassword": "NovaSenha@2026",\n  "confirmPassword": "NovaSenha@2026"\n}',
            response: {},
          },
        ],
      },
      {
        id: 'security-devices',
        name: 'Dispositivos',
        endpoints: [
          {
            id: 'security-verify-device',
            name: 'Verificar dispositivo',
            method: 'POST',
            path: '/api/v1/me/device/verify',
            description: 'Verifica a autenticidade de um dispositivo.',
            documentation: securityVerifyDeviceDocumentation,
            requestBody: '{\n  "deviceId": "{{deviceId}}",\n  "challenge": "{{challenge}}",\n  "signature": "{{signature}}"\n}',
            response: {},
          },
          {
            id: 'security-list-devices',
            name: 'Listar dispositivos',
            method: 'GET',
            path: '/api/v1/me/device',
            description: 'Lista os dispositivos associados à conta.',
            documentation: securityListDevicesDocumentation,
            response: {},
          },
          {
            id: 'security-delete-device',
            name: 'Eliminar dispositivo',
            method: 'DELETE',
            path: '/api/v1/me/device/{{deviceId}}',
            description: 'Remove um dispositivo associado à conta.',
            documentation: deleteDeviceDocumentation,
            response: {},
          },
        ],
      },
    ],
  },
]
