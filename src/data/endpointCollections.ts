import type { EndpointCollection } from '../shared/types/endpoint'
import { createAccountDocumentation } from './documentation/account/createAccount'
import { getPreferencesDocumentation } from './documentation/preferences/getPreferences'
import { updatePreferencesDocumentation } from './documentation/preferences/updatePreferences'
import { createAvatarUploadUrlDocumentation } from './documentation/profile/createAvatarUploadUrl'
import { deleteAvatarDocumentation } from './documentation/profile/deleteAvatar'
import { getProfileDocumentation } from './documentation/profile/getProfile'
import { uploadAvatarDocumentation } from './documentation/profile/uploadAvatar'
import { loginDocumentation } from './documentation/authentication/login'
import { logoutDocumentation } from './documentation/authentication/logout'
import { refreshTokenDocumentation } from './documentation/authentication/refreshToken'
import { socialLoginDocumentation } from './documentation/authentication/socialLogin'
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
        requestBody: '{\n  "type": "EMAIL",\n  "identifier": "manuelmuanza20@gmail.com",\n  "password": "Mwanza_2026",\n  "publicKey": "{{public_key_clean}}",\n  "trustThisDevice": true\n}',
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
            id: 'social-login',
            name: 'Login',
            method: 'POST',
            path: '/api/v1/auth/social/login',
            description: 'Inicia uma autenticação através de um provedor social.',
            documentation: socialLoginDocumentation,
            requestBody: '{\n  "provider": ""\n}',
            response: {},
          },
          {
            id: 'validate-social-login',
            name: 'Validar login',
            method: 'POST',
            path: '/api/v1/auth/social/validate',
            description: 'Valida e conclui uma autenticação social.',
            documentation: validateSocialLoginDocumentation,
            requestBody: '{\n  "code": ""\n}',
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
        requestBody: '{\n  "firstName": "Pedro",\n  "lastName": "Oscar",\n  "identifierType": "EMAIL",\n  "identifier": "pedrooscar008@gmail.com",\n  "password": "Mwanza_2026"\n}',
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
        requestBody: '{\n  "emailNotificationsEnabled": true,\n  "theme": "DARK",\n  "language": "en-us"\n}',
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
        name: 'Resetar palavra-passe',
        endpoints: [],
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
