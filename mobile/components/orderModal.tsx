import { Button } from '@ui-kitten/components';
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { orderOptions } from '../types/order.types';

interface OrderModalProps {
  onClose: () => void;
  order: string | null;
}

const iframeUrls: Record<string, string> = {
  [orderOptions.EMIT]: "https://docs.google.com/forms/d/e/1FAIpQLSe6k-AKFxILjPhl7SQSnunBJvDsXOTw2OgMfEkTEb5jkBR7lw/viewform?embedded=true",
  [orderOptions.REQUEST]: "https://docs.google.com/forms/d/e/1FAIpQLSdg8sWJJj9TJ8W_fO-l6bKrd1jighfdkG1uqd5tZFFfLIdcBQ/viewform?embedded=true"
};

const OrderModal: React.FC<OrderModalProps> = ({ onClose, order }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      visible={!!order}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {order && order in iframeUrls && (
          <WebView
            onShouldStartLoadWithRequest={() => true}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
            style={styles.webView}
            source={{ uri: iframeUrls[order] }}
          />
        )}
        <Button
          appearance="ghost"
          status="danger"
          style={styles.closeButton}
          onPress={handleClose}
        >
          Cerrar
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '80%',
    marginTop: '22%'
  },
  webView: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 50,
  },
});

export default OrderModal;