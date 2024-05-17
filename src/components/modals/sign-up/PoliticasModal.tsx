'use client';
import { Dispatch, SetStateAction, useEffect } from 'react';
import BackButton from '@/components/atoms/commons/BackButton';
import Button from '@/components/atoms/commons/Button';
import IconVLogo from '@/components/atoms/commons/IconVLogo';
import TextContain from '@/components/atoms/commons/TextContainer';
import Text from '@/components/atoms/commons/Text';

interface PoliticasModalInterface {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  handleAccept: () => void;
}

const PoliticasModal: React.FC<PoliticasModalInterface> = ({
  modal,
  setModal,
  handleAccept,
}) => {
  /* UseEffect para evitar scroll cuando el modal esta abierto */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modal]);

  return (
    <main className='w-screen flex flex-col items-center h-screen justify-between py-[60px] fixed top-0 right-0 z-[100] bg-white-100'>
      <div className='flex-center'>
        <BackButton setState={setModal} />
        <IconVLogo />
      </div>
      <div className='flex flex-col gap-2'>
        <TextContain>
          <Text>
            <p>
              - Utilizamos cookies esenciales para sesiones seguras y eficientes
              en <b>VerifyArca</b>. Estas son necesarias para mantener tu sesión
              activa y segura
            </p>
            <p>
              - Utilizamos cookies esenciales para sesiones seguras y eficientes
              en <b>VerifyArca</b>. Estas son necesarias para mantener tu sesión
              activa y segura
            </p>
            <span className='flex flex-col items-center '>
              <p>
                Consulta nuestra
                <b className='text-blue-700'> Política de Privacidad</b>
              </p>
              <p className='text-blue-700'>
                <b>Configuracion de cookies</b>
              </p>
            </span>
          </Text>
        </TextContain>
      </div>
      <div>
        <Button onClick={handleAccept} type='button' text='Aceptar cookies' />
      </div>
    </main>
  );
};
export default PoliticasModal;
