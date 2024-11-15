import smtplib
import os
import pandas as pd
import re

# Multipurpose Internet Mail Extensions #
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

#              ATENÇÃO: SÓ VAMOS USAR ISSO SE A API NÃO FUNCIONAR, ESSE AQUI N TA AJUSTADO PRO NOSSO PROJETO#
#--------------------------------------------------------------------------------------------------------#
#                                                                                                        #
#                                   ** É necessário atualizar: **                                        #
#                                                                                                        #         
#  - O host SMTP (trocar pro email da gerente/do lar)                                                    #
#  - O diretório dos arquivos                                                                            #
#  - O arquivo de texto, que contém o corpo do Email                                                     #
#                                                                                                        #
#--------------------------------------------------------------------------------------------------------#





def main():
    conectar_smtp()
    print(emails_invalidos)

assinatura_html = """
<div><style type="text/css">.sh-src a {
    text-decoration: none !important;
}</style></div>&nbsp;<table cellpadding="0" cellspacing="0" border="0" class="sh-src" style="margin: 0px; border-collapse: collapse;"><tbody><tr><td style="padding: 0px 1px 0px 0px;"><table cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate; margin: 0px;"><tbody><tr><td align="center" valign="top" style="padding: 0px 14px 0px 0px; vertical-align: top;"><table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;"><tbody><tr><td style="padding: 0px 1px 0px 0px;"><p style="margin: 1px;"><img alt="" title="Profile Picture" width="100" height="100" style="display: block; border: 0px; max-width: 100px;" src="https://www.fhemig.mg.gov.br/images/icones/fhemig.png" /></p></td></tr></tbody></table></td><td valign="top" style="padding: 11px 17px 0px 1px; vertical-align: top;"><table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;"><tbody><tr><td style="padding: 0px 1px 0px 0px; font-family: Arial, sans-serif; font-size: 13px; line-height: 18px; white-space: nowrap;"><p style="font-family: Arial, sans-serif; font-size: 13px; line-height: 18px; font-weight: 700; color: rgb(0,0,0); white-space: nowrap; margin: 1px;">João Victor Vasconcellos de Santana</p><p style="font-family: Arial, sans-serif; font-size: 13px; line-height: 19px; white-space: nowrap; color: rgb(136,136,136); margin: 1px;">Núcleo de Informação<br />AEST</p></td></tr></tbody></table></td><td style="padding: 1px 0px 0px; border-right: 1px solid rgb(136,136,136);">&nbsp;</td><td valign="top" style="padding: 9px 1px 0px 17px; vertical-align: top;"><table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;"><tbody><tr><td style="padding: 0px px 0px 0px;"><table cellpadding="0" cellspacing="0" border="0" style="margin: 0px; border-collapse: collapse;"><tbody><tr><td valign="middle" style="padding: 1px 5px 1px 0px; vertical-align: middle;"><p style="margin: 1px;"><img alt="" width="18" height="18" style="display: block; border: 0px; max-width: 18px;" src="https://www.fhemig.mg.gov.br/images/icones/telefone1.png" /></p></td><td style="font-family: Arial, sans-serif; font-size: 13px; line-height: 18px; white-space: nowrap; color: rgb(136,136,135) !important; padding: 1px 0px; vertical-align: middle;"><p style="margin: 1px;"><a style="font-family: Arial, sans-serif; font-size: 13px; line-height: 18px; white-space: nowrap; color: rgb(136,136,136); text-decoration: none !important;"> <span style="font-family: Arial, sans-serif; font-size: 13px; line-height: 18px; white-space: nowrap; color: rgb(136,136,136); text-decoration: none !important;"> (31) 99961-9992</span></a></p></td></tr><tr><td valign="middle" style="padding: 1px 5px 1px 0px; vertical-align: middle;"><p style="margin: 1px;"><img alt="" width="18" height="18" style="display: block; border: 0px; max-width: 18px;" src="https://www.fhemig.mg.gov.br/images/icones/sei.png" /></p></td><td style="font-family: Arial, sans-serif; font-size: 13px; line-height: 18px; white-space: nowrap; color: rgb(136,136,135) !important; padding: 1px 0px; vertical-align: middle;"><p style="margin: 1px;"><a style="font-family: Arial, sans-serif; font size: 13px; line-height: 18px; white-space: nowrap; color: rgb(136,136,136); text-decoration: none !important;"> <span style="font-family: Arial, sans-serif; font-size: 13px; line-height: 18px; white-space: nowrap; color: rgb(136,136,136); text-decoration: none !important;"> FHEMIG/AEST/NI</span></a></p></td></tr><tr><td valign="top" style="padding: 1px 5px 1px 0px; vertical-align: top;"><p style="margin: 1px;"><img alt="" width="18" height="18" style="display: block; border: 0px; max-width: 18px;" src="https://www.fhemig.mg.gov.br/images/icones/localizacao1.png" /></p></td><td style="font-family: Arial, sans-serif; font-size: 13px; line-height: 18px; white-space: nowrap; color: rgb(136,136,135) !important; padding: 1px 0px; vertical-align: middle;"><p style="margin: 1px;"><span style="font-family: Arial, sans-serif; font-size: 13px; line-height: 18px; white-space: nowrap; color: rgb(136,136,136); text-decoration: none !important;">Prédio Gerais | 13º andar<br />Cidade Administrativa de Minas Gerais </span></p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td colspan="4" style="padding: 2px 0px 0px 0px; border-bottom: 1px solid rgb(136,136,136);">&nbsp;</td></tr></tbody></table><table cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0px; border-collapse: collapse;"><tbody><tr><td style="padding: 10px 1px 0px 0px; font-family: Arial, sans-serif; font-size: 10px; line-height: 14px; color: rgb(136,136,136);"><p style="font-family: Arial, sans-serif; font-size: 10px; line-height: 14px; color: rgb(136,136,136); margin: 1px;">Aviso: Esta mensagem pode conter informações confidenciais ou privilegiadas, cujo sigilo é protegido por lei. O uso indevido será tratado de acordo com as políticas de segurança e privacidade da instituição e a legislação vigente. Caso não seja o destinatário pretendido, notifique imediatamente o remetente e exclua o conteúdo da mensagem.</p></td></tr></tbody></table>
"""
#Digitar o e-mail e senha, pensando em qual servidor SMTP vai ser usado#
meu_email='emailDoLar@gmail.com'
email_login=''
minha_senha='senhaDoLar'

emails_invalidos = []




def conectar_smtp(): #Cria uma sessão SMTP#
     
    try:
        with smtplib.SMTP('smtp.gmail.com',587) as server:
            
            server.starttls() #Criptografia#
            
            print('Realizando login... ')
            server.login(email_login,minha_senha) #Realiza login com o e-mail e senha de quem vai enviar#
            print('Login Concluido')

            ler_planilha(server)  #Começa o processo de leitura da planilha#      
    except Exception as e:
        print(f'Falha no servidor SMTP: {str(e)}') #Verificar qual o erro#


#------------------------------------------------------------------------------------------------------#
#                                                                                                      #
#                                   ** Padrões da planilha **                                          #
#                                                                                                      #
#  - [1,A] = Data/Hora                                                                                 #
#  - [1,B] = Nome Completo                                                                             #
#  - [1,C] = Unidade                                                                                   #
#  - [1,D] = Cargo                                                                                     #
#  - [1,E] = Email                                                                                     #
#                                                                                                      #
#------------------------------------------------------------------------------------------------------#

def ler_planilha(server): #Mudar o codigo para receber da API

    
    lista=pd.read_excel(r'Script_Emails\Apenas_Arquivo\Lista_de_presenca_respostas.xlsx')  #Leitura da planilha do excel#
    
    lista_filtrada=lista.dropna(subset=['Nome Completo', 'E-mail']) #Filtra a planilha lida pra exibir só as linhas totalmente preenchidas#

    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$' #verificar se o email está no padrão correto

    for index, row in lista_filtrada.iterrows(): #Itera a planilha filtrada, salvando nome, email e nome do certificado#
        nome_destinatario=row['Nome Completo']
        
        email_destinatario=row['E-mail']
        if re.match(email_regex, email_destinatario):
            print(f'Escrevendo para {nome_destinatario}')        
            escrever_email(nome_destinatario,email_destinatario,server)
        else:
            emails_invalidos.append((nome_destinatario, email_destinatario))
            print(f"Email inválido encontrado: {email_destinatario}. Pulando este destinatário.")

        




def escrever_email(nome_destinatario,email_destinatario,server):

    
    conteudo=escrever_mensagem(nome_destinatario) #Salva o nome do destinatário e o conteúdo do arquivo txt#

    corpo_html = f"""
    <html>
    <body>
    <p>{conteudo.replace('\n', '<br>')}</p>
    {assinatura_html}
    </body>
    </html>
    """

    
    arq_excel="" #Colocar integrar com a API
    
    

    #Configurando o MIME#
    mensagem=MIMEMultipart()
    mensagem['From']=meu_email
    mensagem['To']=email_destinatario
    mensagem['Subject']='Lar da Vovó - Itens em falta'

    

    mensagem.attach(MIMEText(corpo_html,"html"))
    
    
    with open(arq_excel,"rb") as anexo: # Abrindo o arquivo em modo de leitura binária (rb) - "as anexo" é o objeto de arquivo usado para ler os dados#

        
        base = MIMEBase('application', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet')#Instanciando o MIMEBase, com application/octet-stream para anexar arquivos binários#

        
        base.set_payload(anexo.read()) #Lê todo conteúdo do arquivo binário e define como o payload (corpo de dados) da parte MIME#

        
    encoders.encode_base64(base) #Convertendo os dados binários em caractéres ASCII#

    
    base.add_header('Content-Disposition ',f"attachment; filename={os.path.basename(arq_excel)}") #Adiciona cabeçalho, especifica como o conteúdo deve ser exibido, indica que o conteúdo deve ser tratado como anexo#

    
    mensagem.attach(base) #Anexa o Excel ao e-mail#

    enviar_email(mensagem, email_destinatario,server) #Pega a mensagem MIME, quem vai receber o email e de quem tá mandando#

    
    
def escrever_mensagem(nome):

    
    caminho_texto=(r'/.mensagem.txt') #Pega o arquivo txt, lê e salva o conteúdo numa string#

    
    conteudo=f'Prezado(a) {nome}, como vai?\n' #A string recebe o nome da pessoa que vai receber o Email#

    with open(caminho_texto, 'r', encoding='utf-8') as arquivo:
        conteudo_arquivo=arquivo.read()
        conteudo+=conteudo_arquivo
    return conteudo

def enviar_email(mensagem, email_destinatario, server):

    #Criação de uma sessão de SMTP para enviar o e-mail#
    try:
        
            #Converte a mensagem construída no MIME em uma string a ser enviada#
            texto = mensagem.as_string()
            server.sendmail(meu_email, email_destinatario, texto)
            
            print(f'E-mail enviado para {email_destinatario}')
    except Exception as e:
        print(f'Falha ao enviar e-mail para {email_destinatario}: {str(e)}')


if (__name__=='__main__') : 
    main()