"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Dados simulados para configurações do cliente
const mockSettings = {
  notifications: {
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    promotionalEmails: false,
    bookingConfirmations: true,
    cancellationAlerts: true,
    reminderTiming: 24,
  },
  booking: {
    autoConfirmBookings: false,
    allowOnlineBooking: true,
    preferredBookingTime: "afternoon",
    bufferTimePreference: 15,
    favoriteBarber: "Mike Johnson",
  },
  privacy: {
    shareDataForAnalytics: false,
    allowMarketingCommunications: false,
    showProfileToBarbers: true,
    shareAppointmentHistory: true,
  },
  preferences: {
    timezone: "America/Sao_Paulo",
    language: "pt-BR",
    currency: "BRL",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 60,
    passwordLastChanged: "2023-05-15",
    loginNotifications: true,
  },
  loyalty: {
    earnPoints: true,
    receiveRewards: true,
    birthdayOffers: true,
    referralProgram: true,
  },
};

export default function CustomerSettings() {
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "barber" | "customer">("customer");
  const [settings, setSettings] = useState(mockSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole") as
      | "admin"
      | "barber"
      | "customer"
      | null;
    if (!userRole) {
      router.push("/login");
      return;
    }
    setRole(userRole);
    if (userRole !== "customer") {
      router.push(`/${userRole}/dashboard`);
    }
  }, [router]);

  const handleNotificationChange = (key: string, value: boolean | number) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleBookingChange = (key: string, value: boolean | string | number) => {
    setSettings(prev => ({
      ...prev,
      booking: {
        ...prev.booking,
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSecurityChange = (key: string, value: boolean | number) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleLoyaltyChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      loyalty: {
        ...prev.loyalty,
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    try {
      toast.success("Configurações salvas com sucesso!");
      setHasChanges(false);
    } catch (error) {
      toast.error("Falha ao salvar configurações");
    }
  };

  const handleResetPassword = () => {
    try {
      toast.success("Email para redefinição de senha enviado!");
    } catch (error) {
      toast.error("Falha ao enviar email para redefinição de senha");
    }
  };

  const handleDeleteAccount = () => {
    if (confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
      try {
        toast.success("Solicitação de exclusão de conta enviada. Você receberá um email de confirmação.");
      } catch (error) {
        toast.error("Falha ao processar solicitação de exclusão de conta");
      }
    }
  };

  return (
    <DashboardLayout role="customer">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Configurações</h1>
            <p className="text-gray-400">
              Gerencie suas preferências de conta e configurações de privacidade
            </p>
          </div>
          {hasChanges && (
            <Button
              onClick={handleSaveSettings}
              className="bg-amber-600 hover:bg-amber-700 text-black"
            >
              Salvar Alterações
            </Button>
          )}
        </div>

        <div className="grid gap-6">
          {/* Configurações de Notificações */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Escolha como e quando deseja ser notificado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações por Email</Label>
                  <p className="text-sm text-gray-400">Receber notificações por email</p>
                </div>
                <Switch
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações por SMS</Label>
                  <p className="text-sm text-gray-400">Receber notificações por SMS</p>
                </div>
                <Switch
                  checked={settings.notifications.smsNotifications}
                  onCheckedChange={(checked) => handleNotificationChange("smsNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Lembretes de Agendamento</Label>
                  <p className="text-sm text-gray-400">Receber lembretes sobre agendamentos futuros</p>
                </div>
                <Switch
                  checked={settings.notifications.appointmentReminders}
                  onCheckedChange={(checked) => handleNotificationChange("appointmentReminders", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Confirmações de Agendamento</Label>
                  <p className="text-sm text-gray-400">Receber confirmações quando agendamentos forem feitos</p>
                </div>
                <Switch
                  checked={settings.notifications.bookingConfirmations}
                  onCheckedChange={(checked) => handleNotificationChange("bookingConfirmations", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Emails Promocionais</Label>
                  <p className="text-sm text-gray-400">Receber ofertas e conteúdos promocionais</p>
                </div>
                <Switch
                  checked={settings.notifications.promotionalEmails}
                  onCheckedChange={(checked) => handleNotificationChange("promotionalEmails", checked)}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="reminderTiming">Horário do Lembrete (horas antes)</Label>
                  <Input
                    id="reminderTiming"
                    type="number"
                    value={settings.notifications.reminderTiming}
                    onChange={(e) => handleNotificationChange("reminderTiming", parseInt(e.target.value))}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferências de Agendamento */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Preferências de Agendamento</CardTitle>
              <CardDescription>
                Configure suas preferências e padrões de agendamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Permitir Agendamento Online</Label>
                  <p className="text-sm text-gray-400">Permitir agendamento de compromissos online</p>
                </div>
                <Switch
                  checked={settings.booking.allowOnlineBooking}
                  onCheckedChange={(checked) => handleBookingChange("allowOnlineBooking", checked)}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="preferredTime">Horário Preferido para Agendamento</Label>
                  <Select value={settings.booking.preferredBookingTime} onValueChange={(value) => handleBookingChange("preferredBookingTime", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Manhã (9h - 12h)</SelectItem>
                      <SelectItem value="afternoon">Tarde (12h - 17h)</SelectItem>
                      <SelectItem value="evening">Noite (17h - 20h)</SelectItem>
                      <SelectItem value="any">Qualquer horário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="favoriteBarber">Barbeiro Preferido</Label>
                  <Select value={settings.booking.favoriteBarber} onValueChange={(value) => handleBookingChange("favoriteBarber", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                      <SelectItem value="David Wilson">David Wilson</SelectItem>
                      <SelectItem value="John Smith">John Smith</SelectItem>
                      <SelectItem value="Alex Brown">Alex Brown</SelectItem>
                      <SelectItem value="any">Sem preferência</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configurações de Privacidade */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Configurações de Privacidade</CardTitle>
              <CardDescription>
                Controle suas preferências de privacidade e compartilhamento de dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Compartilhar Dados para Análise</Label>
                  <p className="text-sm text-gray-400">Ajude a melhorar nossos serviços com dados anônimos</p>
                </div>
                <Switch
                  checked={settings.privacy.shareDataForAnalytics}
                  onCheckedChange={(checked) => handlePrivacyChange("shareDataForAnalytics", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Comunicações de Marketing</Label>
                  <p className="text-sm text-gray-400">Permitir comunicações de marketing de parceiros</p>
                </div>
                <Switch
                  checked={settings.privacy.allowMarketingCommunications}
                  onCheckedChange={(checked) => handlePrivacyChange("allowMarketingCommunications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Mostrar Perfil para Barbeiros</Label>
                  <p className="text-sm text-gray-400">Permitir que barbeiros vejam seu perfil e preferências</p>
                </div>
                <Switch
                  checked={settings.privacy.showProfileToBarbers}
                  onCheckedChange={(checked) => handlePrivacyChange("showProfileToBarbers", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Compartilhar Histórico de Agendamentos</Label>
                  <p className="text-sm text-gray-400">Permitir que barbeiros vejam seu histórico de agendamentos</p>
                </div>
                <Switch
                  checked={settings.privacy.shareAppointmentHistory}
                  onCheckedChange={(checked) => handlePrivacyChange("shareAppointmentHistory", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferências Gerais */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Preferências Gerais</CardTitle>
              <CardDescription>
                Configure suas preferências gerais do aplicativo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Input
                    readOnly
                    value="America/Sao_Paulo"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="language">Idioma</Label>
                  <Input
                    readOnly
                    value="Português (Brasil)"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Moeda</Label>
                  <Input
                    readOnly
                    value="Real (BRL)"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="timeFormat">Formato de Hora</Label>
                  <Input
                    readOnly
                    value="24 horas"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Programa de Fidelidade */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Programa de Fidelidade</CardTitle>
              <CardDescription>
                Gerencie suas preferências do programa de fidelidade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Ganhar Pontos de Fidelidade</Label>
                  <p className="text-sm text-gray-400">Ganhe pontos a cada agendamento</p>
                </div>
                <Switch
                  checked={settings.loyalty.earnPoints}
                  onCheckedChange={(checked) => handleLoyaltyChange("earnPoints", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Receber Recompensas</Label>
                  <p className="text-sm text-gray-400">Receba notificações sobre recompensas disponíveis</p>
                </div>
                <Switch
                  checked={settings.loyalty.receiveRewards}
                  onCheckedChange={(checked) => handleLoyaltyChange("receiveRewards", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Ofertas de Aniversário</Label>
                  <p className="text-sm text-gray-400">Receba ofertas especiais no seu aniversário</p>
                </div>
                <Switch
                  checked={settings.loyalty.birthdayOffers}
                  onCheckedChange={(checked) => handleLoyaltyChange("birthdayOffers", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Programa de Indicação</Label>
                  <p className="text-sm text-gray-400">Participe do programa de indicação</p>
                </div>
                <Switch
                  checked={settings.loyalty.referralProgram}
                  onCheckedChange={(checked) => handleLoyaltyChange("referralProgram", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Configurações de Segurança */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>
                Gerencie a segurança e autenticação da sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-gray-400">Adicione uma camada extra de segurança à sua conta</p>
                </div>
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações de Login</Label>
                  <p className="text-sm text-gray-400">Receba notificações quando alguém acessar sua conta</p>
                </div>
                <Switch
                  checked={settings.security.loginNotifications}
                  onCheckedChange={(checked) => handleSecurityChange("loginNotifications", checked)}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="sessionTimeout">Tempo de Sessão (minutos)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleSecurityChange("sessionTimeout", parseInt(e.target.value))}
                    className="bg-gray-800 border-gray-700"
                  />
                  <p className="text-xs text-gray-400 mt-1">Logout automático após inatividade</p>
                </div>
                <div>
                  <Label>Senha</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleResetPassword}
                      className="border-gray-700 hover:bg-gray-700"
                    >
                      Alterar Senha
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Última alteração: {settings.security.passwordLastChanged}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gerenciamento de Conta */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Gerenciamento de Conta</CardTitle>
              <CardDescription>
                Gerencie sua conta e dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Exportar Dados</Label>
                  <p className="text-sm text-gray-400">Baixe uma cópia dos seus dados da conta</p>
                </div>
                <Button
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-700"
                  onClick={() => toast.success("Solicitação de exportação de dados enviada. Você receberá um email em breve.")}
                >
                  Exportar Dados
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Excluir Conta</Label>
                  <p className="text-sm text-gray-400">Exclua permanentemente sua conta e todos os dados</p>
                </div>
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500/10"
                  onClick={handleDeleteAccount}
                >
                  Excluir Conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
